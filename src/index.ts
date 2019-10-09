import { classDescriptor, propDescriptor, printObj } from "./descriptor"



@classDescriptor('用户')
class User {
	
	@propDescriptor('账号')
	loginId: string

	@propDescriptor('密码')
	loginPwd: string
}


const u = new User()

u.loginId = 'abc'
u.loginPwd = '123'
printObj(u)

