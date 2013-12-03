#ruby Thread
#require 'test5'
load 'test5.rb'
require 'digest/md5'

bigNum=100_000					#10进制
p "bigNum is #{bigNum}"

byteNum=0b110
p "byteNum is #{byteNum}"		#2进制

num8=01
p "num8 is #{num8}"				#8进制

num16=0xa0
p "num16 is #{num16}"			#16进制

#a='a'
p "ANSII a=#{?a} ,b=#{?b},\\n#{?\n}" 	#失败 通过？获取字符的ANSII码


str='this is a str'
p "str des :#{str.crypt('salt')}"	#saMvhs7cHKAmw这是加密后的结果
p "str md5 :#{ Digest::MD5.hexdigest(str)}"

p "base64 :#{base64_str=[str].pack('m')} encode :#{base64_str.unpack('m')}" 	#base64位加密

a="abcdefg"
p "a :#{a}"
p ":abcdefg :#{:abcdefg},#{:abcdefg.object_id}" #符号

ticket=Ticket.new('131201|7|0,1,3','1312010000001')
t=Thread.new{
	sum=0
	num=100
	num.times{|i|sum=sume+i}
	p "#{num}++ sum is :#{sum}"
	p "ticket id:#{ticket::ticketId},voteNum:#{ticket::voteNum}"
}



