import type {
	Content,
	PageComponent,
	PartComponent
} from '@enonic-types/core';


import {
	describe,
	test
} from '@jest/globals';
import {
	expectAssignable,
} from 'tsd';


const myPart = ({
	path = '/'
}: {
	path?: string
} = {}) => ({

	// TODO: Any of the two first works, but not the third, why?
	// type: 'part' as PartComponent['type'],
	type: 'part' as const,
	// type: 'part',

	// TODO: Again, any of the two first works, but not the third, why?
	// descriptor: 'com.enonic.app.myapp:mypart' as PartComponent['descriptor'],
	descriptor: 'com.enonic.app.myapp:mypart' as const,
	// descriptor: 'com.enonic.app.myapp:mypart',

	config: {},
	path
});

const myPage = ({
	components = [
		myPart({
			path: '/main/0'
		})
	]
}: {
	components?: PageComponent['regions']['main']['components']
} = {}) => ({
	// type: 'page' as PageComponent['type'],
	type: 'page' as const,
	// descriptor: 'com.enonic.app.myapp:mypage' as PageComponent['descriptor'],
	descriptor: 'com.enonic.app.myapp:mypage' as const,
	config: {},
	//path: '/' as PageComponent['path'],
	path: '/' as const,
	regions: {
		main: {
			name: 'main',
			components
		}
	} // as PageComponent['regions']
});

const optionalFields = {
	_score: 1,
	_sort: [{}],
	childOrder: 'childOrder',
	// inherit: ['CONTENT'] as Content['inherit'],
	inherit: ['CONTENT' as const],
	language: 'language',
	// modifier: 'user:repo:modifier' as Content['modifier'],
	modifier: 'user:repo:modifier' as const,
	modifiedTime: '2021-01-01T00:00:00Z',
	originProject: 'originProject',
	publish: {
		first: 'first',
		from: 'from',
		to: 'to',
	},
	variantOf: 'variantOf',
	workflow: {
		checks: {
			string: 'APPROVED' as const
		}, //as Content['workflow']['checks'],
		// state: 'READY' as Content['workflow']['state'],
		state: 'READY' as const,
	}
};

const commonFields = {
	...optionalFields,
	_id: 'id',
	_name: 'name',
	_path: '/',
	attachments: {},
	createdTime: '2021-01-01T00:00:00Z',
	// creator: 'user:repo:creator' as Content['creator'],
	creator: 'user:repo:creator' as const,
	data: {},
	displayName: 'displayName',
	hasChildren: false,
	// owner: 'user:repo:creator' as Content['owner'],
	owner: 'user:repo:creator' as const,
	valid: true,
	x: {}
};

const siteContent = {
	...commonFields,
	// fragment: undefined,
	page: myPage(),
	type: 'portal:site',
};

const fragmentContent = {
	...commonFields,
	// data: undefined, // NOTE: Not needed after fixed in xp#10176
	fragment: myPart(),
	// page: undefined, // NOTE: Not needed after fixed in xp#10176
	// page: undefined as never, // If page wasn't optional, this would be needed :( ugly
	type: 'portal:fragment' as const // TODO: Something is going on, why is this needed???
};

const folderContent = {
	...commonFields,
	// fragment: undefined, // NOTE: Not needed after fixed in xp#10176
	page: {}, // Yes page can be an empty object
	type: 'base:folder' as const, // TODO: Something is going on, why is this needed???
};


describe('core', () => {
	describe('PartComponent', () => {
		test('myPart is assignable', () => {
			expectAssignable<PartComponent>(myPart());
		});
	});
	describe('PageComponent', () => {
		test('myPage is assignable', () => {
			expectAssignable<PageComponent>(myPage());
		});
	});
	describe('Content', () => {
		test('siteContent is assignable', () => {
			expectAssignable<Content>(siteContent);
		});
		test('fragmentContent is assignable', () => {
			expectAssignable<
				Content<
				{},
				'portal:fragment',
				PartComponent
			>
			>(fragmentContent);
			// expectAssignable<Content>(fragmentContent); // TODO Why doesn't it detect the type?
		});
		test('folderContent is assignable', () => {
			expectAssignable<Content<{},'base:folder',{}>>(folderContent);
		});
	});
});
