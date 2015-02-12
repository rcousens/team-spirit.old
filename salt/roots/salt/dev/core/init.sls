include:
  - nginx
  - php
  - redis
  - postgresql
  - nodejs
  - elasticsearch

git:
  pkg.latest:
    - order: first

vagrant-sudoers:
  file.managed:
    - name: /etc/sudoers.d/vagrant
    - source: salt://_files/sudo/vagrant
    - template: jinja
    - order: last

app-composer-install:
  cmd.run:
    - name: 'COMPOSER=`which composer`; $COMPOSER -n install'
    - cwd: /srv/www/ts.dev/
    - onlyif: test -f /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last

app-npm-install:
  cmd.run:
    - name: 'NPM=`which npm`; $NPM install'
    - cwd: /srv/www/ts.dev/
    - onlyif: test -f /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last

app-create-db:
  cmd.run:
    - name: 'PHP=`which php`; $PHP app/console doctrine:database:create'
    - cwd: /srv/www/ts.dev/
    - onlyif: test -f /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last

app-create-schema:
  cmd.run:
    - name: 'PHP=`which php`; $PHP app/console doctrine:schema:create'
    - cwd: /srv/www/ts.dev/
    - onlyif: test -f /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last

set-cache-permissions:
  cmd.run:
    - name: 'SETFACL=`which setfacl`; $SETFACL -R -m u:apache:rwX /srv/www/ts.dev /srv/www/ts.dev; $SETFACL -dR -m u:apache:rwX /srv/www/ts.dev /srv/www/ts.dev'
    - cwd: /root/
    - order: last

set-web-permissions:
  cmd.run:
    - name: 'SETFACL=`which setfacl`; $SETFACL -R -m u:vagrant:rwX /srv/www/ts.dev /srv/www/ts.dev; $SETFACL -dR -m u:vagrant:rwX /srv/www/ts.dev'
    - cwd: /root/
    - order: last
