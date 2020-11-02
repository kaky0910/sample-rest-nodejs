FROM elastic/filebeat:7.9.2

COPY ./filebeat.yml /usr/share/filebeat/filebeat.yml
USER root

RUN [ -d /var/log ] && echo "Directory Exists" || mkdir /var/log
RUN chown -R root /usr/share/filebeat