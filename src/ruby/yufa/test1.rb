$KCODE="u"
require "jcode"

###############################################################
#代码1
class Robot
	#说话
	def say(words)
		puts words
	end

	#说你好
	def say_hello
		say '你好!'
	end

end

my_robot=Robot.new 			#new实例化
my_robot.say_hello			#调用say_hello

###############################################################
#代码2
str="I am a string"
puts "str size:#{str.size} length:#{str.length}"
puts "str class:#{str.class} 100 class:#{100.class}"

=begin
文档注释
2013/12/2 23:46
=end


###############################################################
#代码3
a=0
if a<10
	puts "a小于10"
elsif a<20
	puts "a大于等于10，但小于20"
elsif a<30
	puts "a大于等于20，但小于30"
else
	puts "a小于30"
end

puts "a小于10 if a<10" if a<10

#unless 相当于！，否
unless a<10 then
	puts "a 不小于10"
else
	puts "a<10"
end


###############################################################
#代码4 （相当于switch）
case a.class.name
when "String"
	puts "a 为字符串"
when "Fixnum","Bignum","Float"
	puts "a 为数字"
when "Array"
	pust "a数组"
else
	puts "a为#{a.class.name}"
end


###############################################################
#代码5
a=0
while a==0 #do 可以省略
	puts 'a==0'
	a=a+1
end  

i=0
print "until i>10 :"
until i>10 #until 循环
	print i
	i+=1
end
puts "\n"

print "for i in [1,2,3,4,5] :"
for i in [1,2,3,4,5] #for in Array
	print i
end
puts "\n"

print "for i in (1..10) #for in(1..10) :"
for i in (1..10) #for in(1..10)
	print i
end
puts "\n"


print "[1,2,3,4,5,6,7,8,9,10].each :"
[1,2,3,4,5,6,7,8,9,10].each do |i| print i end
puts "\n"


for i in (1..10)
	next if i<5 	#next is like continue
	break if i==9   #break
	print i
end
puts "\n"

###############################################################
#代码6
class MyClass
end

puts MyClass.class
puts MyClass.class.superclass
puts MyClass.class.superclass.superclass
puts MyClass.class.superclass.superclass.superclass


###############################################################
#代码7
class MyClass
	def self.method1	#类方法
		puts "method 1"
	end
	def MyClass.method2 #类方法
		puts "method 2"
	end
	def method3 		#实例方法，对象的方法
		puts "method 3"
	end
end

MyClass.method1				#相当于java的静态方法
MyClass.method2
MyClass.new.method3


###############################################################
#代码8
class MyClass
	#使用attr_accessor定义attr1属性
	attr_accessor:attr1

	#使用方法定义attr2属性
	def attr2
		@attr2
	end

	def attr2=(value)
		@attr2=value
	end

end


my_class=MyClass.new
my_class.attr1="attr1"
puts my_class.attr1

my_class.attr2="attr2"
puts my_class.attr2



###############################################################
#代码9
class MyClass
	#默认是public
	def public_method
		puts "public_method"
	end

	protected
	def protected_method
		puts "protected_method"
	end

	private
	def private_method
		puts "private_method"
	end

	public
	def public_method1
		puts "public_method1"
	end
end


class MySubClass < MyClass
	#子类可以在内部使用父类中Protected和private的方法
	def call_protected_method
		protected_method
	end

	def call_private_method
		private_method
	end
end

my_sub_class=MySubClass.new
my_sub_class.call_private_method
my_sub_class.call_protected_method

###############################################################
#代码10

class MyClass
	def initialize(name)
		@name=name
	end

	def compare(c)
		c.name==@name
	end

	#private	#`compare': private method `name' called for #<MyClass:0x331e770 @name="b"> (NoMethodError)
	protected 	#换成private,在compare中c.name即会报错
	def name
		@name
	end
end

a=MyClass.new('a')
b=MyClass.new('b')
a.compare(b)


###############################################################
#代码11

class MyClass
	@@instant_object_count=0

	#返回MyClass的实例数量
	def self.instant_object_count
		@@instant_object_count
	end

	#返回实例对象的序号
	def object_index
		@instant_object_index
	end

	#实例方法返回MyClass的所有实例数量
	def object_count
		@@instant_object_count
	end

	#初始化函数
	def initialize
		#创建新实例对象时，类变量计数器加1，并且标记序号给实例变量
		@@instant_object_count=@@instant_object_count+1
		@instant_object_index=@@instant_object_count
	end

end

my_class1=MyClass.new
puts "现在有#{MyClass.instant_object_count}个MyClass实例"
my_class2=MyClass.new
puts "现在有#{my_class1.object_count}个MyClass实例"
puts "my_class1的序号#{my_class1.object_index},共有#{my_class1.object_count}个实例对象"
puts "my_class2的序号#{my_class2.object_index},共有#{my_class2.object_count}个实例对象"



###############################################################
#代码12
class Fixnum
	#添加一个实例方法
	def speak
		puts "我的值是#{self}"
	end

	#覆盖旧的abs方法
	def abs
		puts "abs不能用"
	end

end

#扩展类方法
def Fixnum.say_hello
	puts "hello!"
end

#批量扩展类方法
class << Fixnum

	def say_hello_again
		puts "hello agin!"
	end
end


1.speak
-1.abs
Fixnum.say_hello
Fixnum.say_hello_again


###############################################################
#代码13
class Person

	attr_accessor:name,:age

	def say_hello
		puts "你好,我是#{self.name}"
	end

	def say_age
		puts "我的年龄#{self.age}"
	end

end

class Man<Person
	def sex
		return @sex
	end

	def sex=k
		@sex=k
	end

	def say_sex
		puts "我的性别是#{self.sex}"
	end

	def say_hello
		super #掉用Person类中的say_hello方法
		say_age
		say_sex
	end

end

man=Man.new
man.name="张三"
man.sex="男人"
man.age=20
man.say_hello



###############################################################
#代码13

class Fixnum

	#创建一个加法的别
	alias plus+

	def +(value)
		return self.plus(value*2)
	end
end

puts 1.plus(1) 	#结果为2
puts 1+1 		#结果为3



###############################################################
#代码14
class MyClass
	attr_accessor:value

end

a=MyClass.new
a.value=1
b=a
a.value=2
puts a.value
puts b.value

puts 'new copy'
#测试对象复制

a=MyClass.new
a.value=1
def a.new_method
	puts "变量a的新方法"
end

b=a.dup
c=a.clone
a.value=2
puts a.value
puts b.value
puts c.value
a.new_method
#b.new_method	#undefined method `new_method' for #<MyClass:0x340a9b8 @value=1, @instant_object_index=6> (NoMethodError)
c.new_method 	#dup不能复制扩展的方法，clone可以复制扩展的方法


###############################################################
#代码15
class MyClass
	attr_accessor:value
end

a=MyClass.new
a.value=1

#获得a的序列化字符
dump_value=Marshal.dump(a)

#通过序列化字符重建对象
b=Marshal.load(dump_value)

puts b.class 	#输出 MyClass
puts b.value 	#输出1
puts "dump_value:#{dump_value}"


#深度复制方法
def deep_copy(obj)
	Marshal.load(Marshal.dump(obj))
end



###############################################################
#代码16
module MyModule
	def self.module_function
		puts "这是模块方法"
	end

end

module MyModule
	CONST="这是模块中的常量"
	module MySubModule
		CONST="这是子模块中的常量"
	end
end



puts MyModule.class 		#输出Module
MyModule.module_function 	#输出这是模块方法
MyModule::module_function 	#输出这是模块方法


puts MyModule::CONST					#这是模块中的常量
puts MyModule::MySubModule::CONST 		#这是子模块中的常量



###############################################################
#代码17

module MyModule
	def module_method
		puts "module_method"
	end
end

class MyClass
	include MyModule
end


class MyClass1
	extend MyModule
end

my_class=MyClass.new
#类中使用include,模块中的方法变成了实例方法
my_class.module_method


#类中使用extend,模块中的方法成了类方法
MyClass1.module_method



aa="123"
#所有对象都可以extend模块而获得模块中的方法
aa.extend(MyModule)
aa.module_method

####extend方法所扩展的对象取决于调用extend方法的对象



###############################################################
#代码18

class String

	def truncate(n)
		self[0,n]+(self.size>n ? '...':'')
	end

	for i in[5,8,10,20]
		module_eval "def truncate_#{i}
			truncate #{i}
		end
		"
	end
end

puts "abcdefg".truncate(2)
puts "abcdefghijkln".truncate_5
puts "abcdefghijkln".truncate_8



puts "abcd".upcase
puts my_method="upcase"
puts "efg".send(my_method)
puts my_method="downcase"
puts "ABCD".send(my_method)

















