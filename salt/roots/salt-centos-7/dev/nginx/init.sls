nginx:
  pkg.latest:
    - refresh: true
  service.running:
    - enable: true
    - restart: true
    - watch:
      - file: /etc/nginx/nginx.conf
      - file: /etc/nginx/conf.d/ts.dev.conf
      - pkg: nginx

/srv/tmp:
  file:
    - directory
    - user: vagrant
    - group: vagrant
    - makedirs: true

/srv/www/ts.dev:
  file:
    - directory
    - user: vagrant
    - group: vagrant
    - makedirs: true

nginx-conf:
  file.managed:
    - name: /etc/nginx/nginx.conf
    - source: salt://_files/nginx/conf/nginx.conf
    - template: jinja
    - require:
      - pkg: nginx

nginx-vhost-dev:
  file.managed:
    - name: /etc/nginx/conf.d/ts.dev.conf
    - source: salt://_files/nginx/vhosts/ts.dev.conf
    - template: jinja
    - require:
      - file: nginx-conf
      - pkg: nginx
