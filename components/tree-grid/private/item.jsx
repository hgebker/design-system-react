import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TREE_GRID_ITEM } from '../../../utilities/constants';
import Button from '../../button';
import Checkbox from '../../checkbox';
import TreeGridCell from './cell';

class Item extends React.Component {
	handleExpansion = (event) => {
		const obj = {
			node: this.props.row,
			expanded: !this.props.row.expanded,
		};
		this.props.onExpand(event, obj);
	};

	handleSelection = (event) => {
		const obj = {
			node: this.props.row,
			selected: !this.props.row.selected,
		};
		this.props.onSelect(event, obj);
	};

	render() {
		return (
			<React.Fragment>
				<tr
					aria-level={this.props.level}
					aria-posinset="1"
					aria-selected="false"
					aria-setsize="4"
					className={classNames(
						`slds-hint-parent`,
						this.props.isSelected ? `slds-is-selected` : null
					)}
					onClick={() =>
						this.props.isSingleSelect ? this.props.onSelect() : null
					}
					tabIndex="0"
				>
					{!this.props.isSingleSelect ? (
						<td
							className="slds-text-align_right"
							role="gridcell"
							style={{ width: '3.25rem' }}
						>
							<Checkbox
								name="options"
								assistiveText={{
									label: `Select item ${this.props.id}`,
								}}
								id={`${this.props.id}-checkbox`}
								checked={this.props.row.selected}
								onChange={this.handleSelection}
							/>
						</td>
					) : null}
					{this.props.columns.map((col, i) => (
						<TreeGridCell
							id={`${this.props.id}-col-${i}`}
							isPrimaryColumn={col.props.isPrimaryColumn}
							isChildOpen={this.props.row.expanded}
							hasChildren={this.props.row.nodes !== undefined}
							onClickExpand={this.handleExpansion}
						>
							{col.props.typeAttributes
								? this.props.row[col.props.typeAttributes.label.fieldName]
								: this.props.row[col.props.property]}
						</TreeGridCell>
					))}
					<td role="gridcell" style={{ width: '3.25rem' }}>
						<Button
							variant="icon"
							className="slds-button_icon-border-filled"
							iconSize="x-small"
							iconCategory="utility"
							iconName="down"
							assistiveText={{
								icon: `More actions for`,
							}}
						/>
					</td>
				</tr>
			</React.Fragment>
		);
	}
}

Item.displayName = TREE_GRID_ITEM;

Item.propTypes = {
	id: PropTypes.string,
	level: PropTypes.number,
	columns: PropTypes.arrayOf(PropTypes.object),
	row: PropTypes.object,
	onSelect: PropTypes.func,
	onCollapse: PropTypes.func,
};

Item.defaultProps = {
	level: 1,
	isOpen: false,
};

export default Item;