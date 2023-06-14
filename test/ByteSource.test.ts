import type {
	AddAttachmentParam,
	CreateMediaParams,
} from '@enonic-types/lib-content';
//'/lib/xp/content';


import {
	describe,
	test
} from '@jest/globals';
import {
	expectNotAssignable,
} from 'tsd';


describe('ByteSource', () => {
	test('AddAttachmentParam', () => {
		const illegalAddAttachmentParams = {
			data: {},
			key: 'whatever',
			name: 'whatever',
			mimeType: 'whatever'
		}
		expectNotAssignable<AddAttachmentParam>(illegalAddAttachmentParams);
	});

	test('CreateMediaParams', () => {
		const illegalCreateMediaParams = {
			data: {},
			focalX: '0.5',
			focalY: '0.5',
			idGenerator: (v: string) => v,
			name: 'whatever',
			mimeType: 'whatever',
			parentPath: 'whatever'
		}
		expectNotAssignable<CreateMediaParams>(illegalCreateMediaParams);
	});
});
