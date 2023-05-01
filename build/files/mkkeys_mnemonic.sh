#!/usr/bin/expect -d

set PREFIX [lindex $argv 0]
set MNEMONIC [lindex $argv 1]
set PASSWORD [lindex $argv 2]
set NUM_VALIDATORS [lindex $argv 3]
set timeout -1
set mnemonic {}

spawn /usr/bin/deposit existing-mnemonic --num_validators $NUM_VALIDATORS --chain mainnet

expect "Please choose your language " { send "3\r" }

expect "prefer.: " { send "$MNEMONIC\r" }

expect -re ".*:" { send "0\r" }

expect -re ".*confirm:" { send "0\r" }

expect "Ethereum validators.: " {
	sleep 1
	send "$PASSWORD\r"
}

expect "Repeat your keystore password for confirmation: " {
	sleep 1
	send "$PASSWORD\r"
}

expect {
 "Press any key." {
   send "\n"
 }
}

# Save mnemonic
set MNEMONIC_OUTFILE "validator_keys/mnemonic-$PREFIX.txt"
set CHAN [open $MNEMONIC_OUTFILE w]
puts $CHAN $mnemonic
close $CHAN

# Save password
set PASSWORD_OUTFILE "validator_keys/password-$PREFIX.txt"
set CHAN [open $PASSWORD_OUTFILE w]
puts $CHAN $PASSWORD
close $CHAN