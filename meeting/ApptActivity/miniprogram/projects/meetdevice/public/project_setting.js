module.exports = { //meetdevice
	PROJECT_COLOR: '#1C9DFF',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#1C9DFF',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
	],

	NEWS_NAME: '通知公告',
	NEWS_CATE: [
		{ id: 1, title: '通知公告', style: 'leftpic' },
	],
	NEWS_FIELDS: [

	],

	ENROLL_NAME: '活动室',
	ENROLL_CATE: [
		{ id: 1, title: '社会活动' }, 
		{ id: 2, title: '娱乐比赛' },
		{ id: 3, title: '文艺汇演' },
		{ id: 4, title: '招聘会' }, 
		{ id: 5, title: '学科竞赛' }, 
		{ id: 6, title: '校企联合' }, 

	],
	ENROLL_FIELDS: [


	],
	ENROLL_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '联系人', must: true, min: 2, max: 30, edit: false },
		{ mark: 'phone', type: 'text', len: 11, title: '手机号', must: true, edit: false },
		{ mark: 'num', type: 'text', max: 50, title: '人数', must: true, edit: false },
		{ mark: 'dest', type: 'text', max: 50, title: '事项', must: true, edit: false },
	],

	ENROLL_TIME_NODE: {
		mark: 'mark-no',
		start: 6, //开始
		end: 23, // 结束
		price: 0, //价格 
		succ: false //是否已预订 
	},
	ENROLL_DAY_NODE: [
		{
			mark: 'mark-no',
			start: 6, //开始
			end: 23, // 结束
			price: 0,
			succ: false
		},
	],


}