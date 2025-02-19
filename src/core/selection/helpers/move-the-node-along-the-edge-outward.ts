/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

/**
 * @module selection
 */

import type { Nullable } from 'jodit/types';
import { Dom } from 'jodit/core/dom/dom';

/**
 * Moves the fake node up until it encounters a non-empty sibling on the left(right)
 * @private
 */
export function moveTheNodeAlongTheEdgeOutward(
	node: Node,
	start: boolean,
	root: HTMLElement
): void {
	let item: Nullable<Node> = node;

	while (item && item !== root) {
		const sibling = Dom.findSibling(item, start);

		if (sibling) {
			return;
		}

		if (Dom.isCell(item.parentElement)) {
			break;
		}

		item = item.parentElement;

		if (item && item !== root) {
			start ? Dom.before(item, node) : Dom.after(item, node);
		}
	}

	return;
}
