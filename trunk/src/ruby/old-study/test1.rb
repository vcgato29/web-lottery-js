#第一个Ruby程序，阶乘
#wchen 2013-11-26 21:28
def fact(n)
	if n<0
		0 		#ruby可以不用写return，解释器会以最后的一次赋值为返回值#当然也可以写return
	elsif n==0
		1
	else
		n*fact(n-1)
	end
end

#执行上面的方法
puts 'fact method invoke value is :'+fact(6).to_s()


print fact(ARGV[0].to_i),"\n" #ARGV是读取命令行参数

p '-------------------------------------'

#字符串可以随意相乘
p 'A'*3+'B'*3+'C'*3 #AAABBBCCC


p '-------------------------------------'
p "abc"[0] 	#a
p "abcd"[0,2]	#ab


p '-------------------------------------'
puts 'aa'=='cc'	#false
puts 'aa'=='aa'	#true


p '-------------------------------------'
words=['bank','qishui','wahaha']
w=words[rand(3)]

print 'words :'+w


print 'start to run a loop code',"\n"
i=0
while i<10
	i=i+1
	print i
end

print 'i is :'+i.to_s



p '-------------------------------------'
p '正则测试'
def regexTest(s)
	(s=~/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/)!=nil
end

p regexTest 'xxooxx'
p regexTest '2013-11-26 22:07'

p '-------------------------------------'
#input 控制台输入
st="\033[7m"
en="\033[m"
while true
	break;#break
	print 'input>:'
	STDOUT.flush
	str=gets
	break if str=='xoxoxo'
	str.chop!
	print 'pat>:'
	STDOUT.flush
	re=gets
	break if not re
	re.chop!
	str.gsub! re,"#{st}\\&#{en}"
	print str,"\n"
end
print "\n"


p '-------------------------------------'
#Array 数组
p str=[3,4,5,"xxo"].join(':')
p str.split(':')


p '-------------------------------------'
#hash map
p map={1=>2,2=>"3","xx"=>'oo'}
p map[1]
p map['xx']
#p map.xx 不支持


p '-------------------------------------'
secret='name'
p "the word is #{secret}"


p '-------------------------------------'
#STDOUT.flush
#obj=gets
#print 'OK' if not obj



p '-------------------------------------'
i=8
case i
	when 1,2..5
		p 'i in [1~5]'
	when 6..10
		p 'i in [6-10]'
end

p '-------------------------------------'
#for循环
for num in(1..10) do
	print "#{num}\t#{num.class}\n"
end


p '-------------------------------------'

[1,2,3,6,67,343].each do |i| puts i end


multArray=[[1,2,3,4],['a','b','c','d']]

for (a,b,c,d) in multArray do
	p "a=#{a},b=#{b},c=#{c},d=#{d}"
end
multArray.each do |a,b,c,d| p "a=#{a},b=#{b},c=#{c},d=#{d}" end
p '-------------------------------------'





