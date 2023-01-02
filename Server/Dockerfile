FROM python:3.8
WORKDIR Server
RUN pip install flask==2.2.2
RUN pip install Flask-SQLAlchemy==3.0.2
COPY . .
RUN flask init-db
EXPOSE 5000
CMD flask run