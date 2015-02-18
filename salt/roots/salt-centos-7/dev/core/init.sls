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

set-permissions:
  cmd.run:
    - name: 'SETFACL=`which setfacl`; $SETFACL -R -m u:apache:rwX -m u:vagrant:rwX /srv/www /var/log/ts.dev; $SETFACL -dR -m u:apache:rwX -m u:vagrant:rwX /srv/www /var/log/ts.dev'
    - order: last

app-composer-install:
  cmd.run:
    - name: 'COMPOSER=`which composer`; $COMPOSER -n install'
    - cwd: /srv/www/ts.dev
    - onlyif: test -f /srv/www/ts.dev/composer.json
    - user: vagrant
    - group: vagrant
    - order: last

app-npm-install:
  cmd.run:
    - name: 'NPM=`which npm`; $NPM install'
    - cwd: /srv/www/ts.dev
    - onlyif: test -f /srv/www/ts.dev/package.json
    - user: vagrant
    - group: vagrant
    - order: last

app-create-db:
  cmd.run:
    - name: 'PHP=`which php`; $PHP app/console doctrine:database:create'
    - cwd: /srv/www/ts.dev
    - onlyif: test -d /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last

app-create-schema:
  cmd.run:
    - name: 'PHP=`which php`; $PHP app/console doctrine:schema:create'
    - cwd: /srv/www/ts.dev
    - onlyif: test -d /srv/www/ts.dev/src
    - user: vagrant
    - group: vagrant
    - order: last
