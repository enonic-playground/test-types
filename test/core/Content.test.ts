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


const optionalFields = {
	_score: 1,
	_sort: [{}],
	childOrder: 'childOrder',
	inherit: ['CONTENT'] as Content['inherit'],
	language: 'language',
	modifier: 'user:repo:modifier' as Content['modifier'],
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
			string: 'APPROVED'
		} as Content['workflow']['checks'],
		state: 'READY' as Content['workflow']['state'],
	}
};

const commonFields = {
	...optionalFields,
	_id: 'id',
	_name: 'name',
	_path: '/',
	attachments: {},
	creator: 'user:repo:creator' as Content['creator'],
	createdTime: '2021-01-01T00:00:00Z',
	owner: 'user:repo:creator' as Content['owner'],
	displayName: 'displayName',
	hasChildren: false,
	valid: true,
	x: {}
};

const myPart = ({
	path = '/'
}: {
	path?: string
} = {}) => ({
	type: 'part' as PartComponent['type'],
	descriptor: 'com.enonic.app.myapp:mypart' as PartComponent['descriptor'],
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
	type: 'page' as PageComponent['type'],
	descriptor: 'com.enonic.app.myapp:mypage' as PageComponent['descriptor'],
	config: {},
	path: '/' as PageComponent['path'],
	regions: {
		main: {
			name: 'main',
			components
		}
	} // as PageComponent['regions']
});

const siteContent = {
	...commonFields,
	data: {},
	fragment: undefined,
	page: myPage(),
	type: 'portal:site',
};

const fragmentContent = {
	...commonFields,
	data: undefined, // TODO: I don't like that this is needed.
	fragment: myPart(),
	page: undefined, // TODO: I don't like that this is needed.
	type: 'portal:fragment' as const // TODO: Something is going on, why is this needed???
};

const folderContent = {
	...commonFields,
	data: {},
	fragment: undefined, // TODO: I don't like that this is needed.
	page: {}, // Yes page can be an empty object
	type: 'base:folder',
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
				undefined,
				'portal:fragment',
				PartComponent
			>
			>(fragmentContent);
			// expectAssignable<Content>(fragmentContent); // TODO Why doesn't it detect the type?
		});
		test('folderContent is assignable', () => {
			expectAssignable<Content>(folderContent);
		});
	});
});
