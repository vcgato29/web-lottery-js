v1=10
print '#{v1}',"\n"
print "#{v1}","\n"

if v1>0 
	print 'ooo'
end

print 'xx' unless v1>20

"abcd".each_byte{|c| printf "#{c},%c",c}

"a\nbc\ndef".each_line{|i| print i}


#
c=0
for i in 0..6
	print i
	if i==2 && c==0
		c==1
		print "\n"
		#retry
	end
end
print "for end\n"



p "Thread:#{$$} appId:#{$0} serach dir:#{$:}"

#STDOUT.flush
#str=gets
str='x2'
while str.length>0
	str.chop!
	p str
end

x=100.2357
p format "%.2f",x 	#保留2位小数


def oldMtd
	p 'this old Mtd'
end

alias newMtd oldMtd 		#复制方法

newMtd

def oldMtd
	p 'this new OldMtd'
end

oldMtd
newMtd

def pMtd(a,b,*str)
	str.each do |wd|
		p wd
	end
	p "a:#{a} b:#{b}"
end

pMtd(3,2,'2','ab','31','bc')


#类
class Student
	def say(name,age)
		print "my name is #{name},age is #{age}"
	end
	def hello()
		print 'private hello'
	end
	private:hello
end

stu=Student.new 	#.new 是实例化
stu.say('Wchen',23)
#stu.hello #private method


p Math.sqrt(3)

testP=proc{p 'function xx'}
trap "SIGINT" ,testP


