# -*- coding: utf-8 -*-
from flask import (
    send_from_directory,
    render_template,
    flash,
    redirect,
    url_for,
    request,
    current_app,
)
from flask_login import current_user, login_required
from datetime import datetime
from app import dataBase
from app.main import bluePrint
from app.main.forms import EditProfileForm
from app.main.forms import TaskSubmitForm
from app.main.forms import ReportSubmitForm
from app.main.forms import TaskReceiveForm
from app.models import User, Report
import os
from flask import send_from_directory
from os import path


@bluePrint.route("/")
@bluePrint.route("/index")
def index():
    # Приветствие и инструкция
    return render_template("index.html", title="Главная страница")


@bluePrint.route("/favicon.ico")
def favicon():
    # https://stackoverflow.com/questions/48863061/favicon-ico-results-in-404-error-in-flask-app
    
    send_from_directory(
        directory="/home/flask_skipod/app/static",
        filename="favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )


@bluePrint.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        # Flask-login уже добавил пользователя при обращении к current_user
        dataBase.session.add(current_user)
        # поэтому эта строка необязательна
        dataBase.session.commit()


# Пути к ресурсным файлам юзверя
@bluePrint.route("/user/<username>/<path:path>", methods=["GET"])
def send_textures(username, path):
    print(f">>> [GET] path = {path}")

    # Определяем, в какой папке лежат данные для нашего пользователя
    cur_user = User.query.filter_by(username=username).first_or_404()
    cur_folder = (
        os.path.abspath(os.path.curdir)
        + "/volume/userdata/"
        + cur_user.local_folder
        + "/page"
    )
    # print("SIVNSIVNSIRIEFIWHFIHFIRIHFIRH")
    # print(cur_folder)
    # print(path)
    return send_from_directory(cur_folder, path)


# @bluePrint.route("/user/<username>/get_data", methods=["GET"])
# def render_static(username):
#     # Определяем, в какой папке лежат данные для нашего пользователя
#     cur_user = User.query.filter_by(username=username).first_or_404()
#     cur_dir = os.path.curdir
#     cur_dir = os.path.abspath(cur_dir)
#     cur_dir = os.path.realpath(cur_dir)
#     cur_folder = cur_dir + "/volume/userdata/" + cur_user.local_folder + "/page"
#     print("=======> ", cur_folder + "/page.html")
#     return send_from_directory(cur_folder, "/page.html")


@bluePrint.route("/user/<username>/home_page")
@login_required
def user_page(username):
    graph_name = request.args.get("graph_name")
    user = User.query.filter_by(username=username).first_or_404()
    return render_template(
        "user.html", title="Моя страница", user=user, graph_name=graph_name
    )


@bluePrint.route("/user/<username>/task")
@login_required
def download_var(username):
    user = User.query.filter_by(username=username).first_or_404()
    return send_from_directory(
        directory="/home/flask_skipod/volume/vars",
        filename=user.var_file,
        as_attachment=True,
    )
    # return render_template('user.html', title='Моя страница', user=user, graph_name=graph_name)


@bluePrint.route("/upload_report/<path:filename>", methods=["GET", "POST"])
def download(filename):
    cur_abs_path = os.path.abspath(os.path.curdir)
    usr_report_path = "/volume/userdata/" + current_user.local_folder + "/reports"
    return send_from_directory(
        directory=cur_abs_path + usr_report_path, filename=filename
    )


@bluePrint.route("/upload_report", methods=["GET", "POST"])
@login_required
def upload_report():
    form = ReportSubmitForm()
    if form.validate_on_submit():
        # Определим вспомогательные переменные
        print("RFIRFIF")
        cur_abs_path = os.path.abspath(os.path.curdir)
        usr_report_path = "/volume/userdata/" + current_user.local_folder + "/reports"
        # Нужно создать локальную директорию для хранения данных по адресу, который выдан этому юзверю (если таковой есть)
        # if not os.path.exists(cur_abs_path + usr_report_path):
        #     os.makedirs(cur_abs_path + usr_report_path, mode=0x777, exist_ok=True)
        # Нужно записать в эту директорию загнанные данные.
        if os.path.exists(cur_abs_path + usr_report_path):
            report_name = form.file_data.data.filename
            if os.path.exists(cur_abs_path + usr_report_path + "/" + report_name):
                os.remove(
                    os.path.join(cur_abs_path + usr_report_path + "/", report_name)
                )
                if not os.path.exists(
                    cur_abs_path + usr_report_path + "/" + report_name
                ):
                    report = Report.query.filter_by(
                        user_id=current_user.id, report_name=report_name
                    ).delete(synchronize_session=False)
            form.file_data.data.save(cur_abs_path + usr_report_path + "/" + report_name)
            if os.path.exists(cur_abs_path + usr_report_path + "/" + report_name):
                new_report = Report(
                    report_name=report_name,
                    user_id=current_user.id,
                    date_creation=datetime.utcnow(),
                    var_num=current_user.var_num,
                    var_file=current_user.var_file,
                )
                dataBase.session.add(new_report)
        dataBase.session.commit()
        # Всё необходимое создано, возвращаемся на страницу пользователя
        return redirect(url_for("main.upload_report"))
    reports_query = Report.query.filter_by(user_id=current_user.id)
    arReports = []
    for report in reports_query:
        arReports.append(
            {
                "report_name": report.report_name,
                "data_creation": str(report.date_creation).partition(".")[0],
                "mark": report.mark,
                "comment": report.comment,
                "teacher_name": report.teacher_name,
            }
        )
    return render_template(
        "reports.html", title="Мои отчеты", form=form, reports=arReports
    )


@bluePrint.route("/edit_profile", methods=["GET", "POST"])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    # Сохраняем изменения на странице
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        current_user.local_folder = form.local_folder.data
        dataBase.session.commit()
        flash("Your changes have been saved!")
        return redirect(url_for("main.edit_profile"))
    # Только зашли
    if request.method == "GET":
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template("edit_profile.html", title="Изменить данные", form=form)


# @bluePrint.route('/admin', methods=['GET', 'POST'])
# @login_required
# def admin():
#     return render_template('admin.html', title='Администрирование')


@bluePrint.route("/upload_task", methods=["GET", "POST"])
@login_required
def upload_task():
    form = TaskSubmitForm()
    # Сохраняем изменения на странице
    if form.validate_on_submit():
        # Определим вспомогательные переменные
        cur_abs_path = os.path.abspath(os.path.curdir)
        usr_tsk_path = "/volume/userdata/" + current_user.local_folder + "/task"
        usr_pge_path = "/volume/userdata/" + current_user.local_folder + "/page"

        # Нужно создать ещё и локальную директорию для отображения результатов
        if not os.path.exists(cur_abs_path + usr_pge_path):
            os.makedirs(
                cur_abs_path + usr_pge_path + "/Json_models", mode=0x777, exist_ok=True
            )
        # Нужно записать в эту директорию загнанные данные и запустить архитектора.
        if os.path.exists(cur_abs_path + usr_tsk_path):
            # Запись комментария юзверя
            fd = os.open(
                cur_abs_path + usr_tsk_path + "/Task_code.txt", os.O_RDWR | os.O_CREAT
            )
            os.write(fd, bytes(form.task_code.data, "utf-8"))
            os.close(fd)
            # Запись разметки, загруженной юзверем
            # В сети предлагают чекать имя файла через werkzeug, чего я сделать не могу из-за отсутствия в werkzeug этой функции
            graph_name = form.file_data.data.filename
            form.file_data.data.save(cur_abs_path + usr_tsk_path + "/" + graph_name)
            # Найдём xml-ник соответствующего юзверя и его папку для JSON-моделей
            graph_appgen_path = cur_abs_path + "/architect/architect"
            graph_config_file = (
                cur_abs_path + usr_tsk_path + "/" + graph_name
            )  # путь к xml конфигу
            graph_output_dirs = cur_abs_path + usr_pge_path + "/Json_models"

            # Нужно снести все старые данные юзверя
            try:
                os.remove(os.path.join(graph_output_dirs, "Fl*"))
            except OSError:
                pass
            try:
                os.remove(os.path.join(graph_output_dirs, "Op*"))
            except OSError:
                pass
            try:
                os.remove(os.path.join(graph_output_dirs, "Page*"))
            except OSError:
                pass

            # Запуск архитектора
            os_command = (
                graph_appgen_path
                + " "
                + "1"
                + " "
                + graph_config_file
                + " "
                + graph_output_dirs
            )
            os.system(os_command)
#             
            # сохранение таска в бд
            current_user.task_file = form.file_data.data.filename
            dataBase.session.commit()
            
            # algoview 2.0

            # новый архитектор
            # graph_appgen_path_new_cpp = cur_abs_path + "/architect/main"
            graph_appgen_path_new_py = cur_abs_path + "/architect/json2js.py"
            cpp_output_file_path = cur_abs_path + "/app/main/output.json"

            # архитектр сохраняет результат прямо около питоновского скрипта, поэтому дополнительно переносим файл
            # os_command_new_cpp = graph_appgen_path_new_cpp + " " + graph_config_file

            os_command_new_py = (
                "python3 "
                + graph_appgen_path_new_py
                + " "
                + cpp_output_file_path
                + " "
                + graph_output_dirs
                + "/jsonGraphData.js"
            )  # работает

            # print(f"run {os_command_new_cpp}")
            # os.system(os_command_new_cpp)

            os.system(os_command_new_py)

        # Всё необходимое создано, возвращаемся на страницу пользователя
        user = User.query.filter_by(username=current_user.username).first_or_404()
        return render_template("user.html", title="Моя страница", user=user, graph_name=graph_name)
    return render_template('upload_task.html', title='Загрузка задания', form=form)
# >>>>>>> main


@bluePrint.route("/receive_task", methods=["GET"])
@login_required
def receive_task():
    # Просмотр результирующей картинки.
    cur_abs_path = os.path.abspath(os.path.curdir)
    usr_tsk_path = "/volume/userdata/" + current_user.local_folder + "/task"

    # Настройка формы
    form = TaskReceiveForm()
    if os.path.exists(cur_abs_path + usr_tsk_path):
        # Закинем комментарии юзверя в его же форму
        fd = os.open(cur_abs_path + usr_tsk_path + "/Task_code.txt", os.O_RDONLY)
        bytes_data = os.read(fd, 16384)
        form.task_code.data = bytes_data.decode("utf-8")
        # Получаем xml-код пользователя
# <<<<<<< new_core
#         fd = os.open(
#             cur_abs_path + usr_tsk_path + "/" + request.args.get("graph_name"),
#             os.O_RDONLY,
#         )
# =======
        fd = os.open(cur_abs_path + usr_tsk_path + '/' + current_user.task_file, os.O_RDONLY)
# >>>>>>> main
        bytes_data = os.read(fd, 16384)
        xml_code = bytes_data.decode("utf-8")
    # Настройка пути к визуализационной странице и рендер всего ресурса
    # frame_address = "/user/" + current_user.username + "/get_data" // не работает ваще
    frame_address = "/user/" + current_user.username + "/page_new.html"

    # frame_address = '/userdata/' + current_user.username + '/page'
    # print("ILNINLDVGODRO")
    # print(request.args.get('graph_name'))
    return render_template(
        "result_task.html",
        title="Результат",
        form=form,
        source=frame_address,
        xml_code=xml_code,
    )
