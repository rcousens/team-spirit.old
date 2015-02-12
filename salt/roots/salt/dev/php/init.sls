php-fpm:
  pkg.latest:
    - names:
      - php-fpm
      - php-cli
      - php-devel
      - php-intl
      - php-mbstring
      - php-mcrypt      
      - php-opcache
      - php-pdo
      - php-pgsql
      - php-pecl-redis
      - php-pecl-xdebug
      - php-pecl-zip
  service.running:
    - enable: True
    - watch:
      - pkg: php-fpm
      - file: /etc/php.ini
      - file: /etc/php-fpm.d/www.conf
      - file: /etc/php.d/15-xdebug.ini

php-ini:
  file.managed:
    - name: /etc/php.ini
    - source: salt://_files/php/php.ini
    - template: jinja
    - require:
      - pkg: php-fpm

php-fpm-conf:
  file.managed:
    - name: /etc/php-fpm.d/www.conf
    - source: salt://_files/php-fpm/www.conf
    - template: jinja
    - require:
      - pkg: php-fpm

xdebug-ini:
  file.managed:
    - name: /etc/php.d/15-xdebug.ini
    - source: salt://_files/php/15-xdebug.ini
    - template: jinja
    - require:
      - pkg: php-fpm