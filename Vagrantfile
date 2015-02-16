# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "team-spirit"
  config.vm.box_url = "build/virtualbox/vagrant/team-spirit-c7-x86_64.box"
  #config.vm.box_url = "build/virtualbox/vagrant/team-spirit-f21-x86_64.box"

  config.winnfsd.uid = 1000
  config.winnfsd.gid = 1000

  config.vm.provider "virtualbox" do |v|
    v.gui = true
  end

  config.vm.network "forwarded_port", guest: 80, host:9901 # nginx 
  config.vm.network "forwarded_port", guest: 5432, host:9902 # postgresql
  config.vm.network "forwarded_port", guest: 6379, host:9903 # redis
  config.vm.network "forwarded_port", guest: 9200, host:9904 # elasticsearch
  
  config.vm.network "private_network", type: "dhcp"

  config.vm.synced_folder "salt/roots/salt-centos-7", "/srv/salt"
  #config.vm.synced_folder "salt/roots/salt-fedora-21", "/srv/salt"
  config.vm.synced_folder "salt/roots/pillar", "/srv/pillar"
  config.vm.synced_folder "app", "/srv/www/ts.dev", type: "nfs"  
  #config.vm.synced_folder "app", "/srv/www/ts.dev", type: "rsync", rsync__args: ["--verbose", "--archive", "--delete", "-z", "--copy-links", "-F"]
  
  config.vm.provision :salt do |salt|    
    salt.always_install = false
    salt.colorize = true
    salt.install_args = "v2015.2"
    salt.install_type = "git"    
    salt.log_level = "info"
    salt.minion_config = "salt/minion"
    salt.run_highstate = true
    salt.verbose = true
  end
end
