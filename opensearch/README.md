
cat /proc/sys/vm/max_map_count

To increase the value, add the following line to /etc/sysctl.conf:

vm.max_map_count=262144

Then run sudo sysctl -p to reload.
