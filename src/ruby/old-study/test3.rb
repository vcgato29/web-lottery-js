
class People
	@name='p1'
	@sex='man'
	def say
		p "I'm Say ,my name is #{@name},sex is #{@sex}"
	end
end


People.new.say


class Student<People
	def speak
		p "good mon theacher"
	end

	def say
		super
		p "I'm a student"
	end
end

stu=Student.new
stu.say
stu.speak


p '-----------------------------------------'

p1=proc{

	a=10
	b=20
	p "a=#{a},b=#{b},and a+b=#{a+b}"
}

p1.call


p '-----------------------------------------'

$fan='zwchen'
trace_var:$fan,proc{print "$fan now  is #{$fan}","\n"}

$fan='luckWchen'

=begin
$! 最近一次的错误信息
$@ 错误产生的位置
$_ gets最近读的字符串
$. 解释器最近读的行数(line number)
$& 最近一次与正则表达式匹配的字符串
$~ 作为子表达式组的最近一次匹配
$n 最近匹配的第n个子表达式(和$~[n]一样)
$= 是否区别大小写的标志
$/ 输入记录分隔符
$\ 输出记录分隔符
$0 Ruby脚本的文件名
$* 命令行参数
$$ 解释器进程ID
$? 最近一次执行的子进程退出状态
=end


p '-----------------------------------------'
bar=1
loop{bar=45;p "bar=#{bar}";break};
print defined? bar




p '-----------------------------------------'

def box
	contents=15
	get=proc{contents}
	set=proc{|n,s|contents=n;p "s:#{s}"}
	return get,set
end

reader,writer=box
p reader.call
writer.call('haha',' what haha')
p reader.call


p '-----------------------------------------'
Const_Name='Wchen'

p Const_Name
Const_Name='Luck Wchen'


class ConstClass
	C1=100
	C2=101
	C3=103
	def show
		p "C1=#{C1},C2=#{C2},C3=#{C3}"
	end
end

#C1
p ConstClass::C1
ConstClass::C2='xxooxx'
ConstClass.new.show
p '-----------------------------------------'

module ConstModule
	C1=101
	C2=102
	C3=103

	def showConstants
		p "C1=#{C1},C2=#{C2},C3=#{C3}"
	end
end


include ConstModule
p C1

showConstants

p ConstModule::C2

p '-----------------------------------------'


fileName="D:\\test.txt"

#读取文件
def first_line(fileName)
	begin
		file=open(fileName)
		info=file.gets
		file.close
		info
	rescue
		p "has an error occurred:",$!
		nil #如果读取文件有异常，会捕获返回nil
	end
end

p first_line(fileName)


def read_file(fileName)
	size=1
	p 'begin method'
	begin
		file=open(fileName)
	rescue
		p "has an error:#{$!},size:#{size}"
		if size>0
			size=size-1
			p 'retry method'
			retry
		end
	ensure
		file.close
		p 'begin end'
	end
end

read_file(fileName)

p '-----------------------------------------'

class Fruit
	def time_passes
		@condition="rotting"
	end
	def kind=(k)
		@kind=k
	end
	def kind
		@kind
	end
	def inspect
		"a fruit of the #{@kind} variety"
	end
	alias to_s inspect #复制重写to_s方法
end

p f2=Fruit.new
p f2.to_s
p f2.kind
p f2.kind='xxoo'
p f2.kind
p f2.kind

p f3=Fruit.new
p f3.kind


p '-----------------------------------------'

class Fruit
	def initialize(k="apple")
		@kind=k
		@condition="ripe"
	end
end

p f5=Fruit.new(2299)
p f5.kind
p f5=Fruit.new
p f5.kind


p '-----------------------------------------'

file=open(fileName)
p 'file line ....'
file.each_line{|line| p line}
file=open(fileName)
p 'file para....'
file.each('\n'){|para| p para}
file=open(fileName)
file.each_line.with_index(1){|line,lineno| p "#{lineno},line1:"+line}



p '-----------------------------------------'
9.times{|i| print i}










