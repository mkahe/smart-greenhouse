FROM python:3.8
WORKDIR Server
RUN pip install flask==2.2.2
RUN pip install Flask-SQLAlchemy==3.0.2
RUN pip install -U flask-cors==3.0.10
COPY . .
RUN flask init-db
EXPOSE 5000
CMD flask run --host=0.0.0.0