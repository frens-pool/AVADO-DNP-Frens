#!/usr/bin/expect -d

set PREFIX [lindex $argv 0]
set PASSWORD [lindex $argv 1]
set NUM_VALIDATORS [lindex $argv 2]
set timeout -1
set mnemonic {}

spawn /usr/bin/deposit new-mnemonic --num_validators $NUM_VALIDATORS --chain mainnet

expect "Please choose your language " { send "3\r" }

expect "Please choose your mnemonic language " { send "4\r" }

expect "Ethereum validators.: " {
        sleep 1
        send "$PASSWORD\r"
}

expect "Repeat your keystore password for confirmation: " {
        sleep 1
        send "$PASSWORD\r"
}

expect {
-re "\\r\\n\\r\\n\\r\\n(.*)\\r\\n\\r\\n\\r\\n"
 {
   sleep 1
   set mnemonic  $expect_out(1,string)
   puts "Mnemonic $mnemonic"
   send "okee\n"
   sleep 1
 }
}

expect {
-re ".*prefer.\\r\\n\\r\\n: " {
   sleep 1
   send "$mnemonic\n"
 }
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
