var React = require('react');

var CriteriaSelector = React.createClass({
        getInitialState: function() {
            switch (this.props.field.type) {
                case 'string':
                    return {
                        value: '',
                        operator: this.props.field.operators[0],
                        field: this.props.field,
                        term: ''
                    };
                case 'select':
                    return {
                        value: this.props.field.subfields[0],
                        operator: this.props.field.operators[0],
                        field: this.props.field,
                        term: ''
                    };
                case 'string+select':
                    return {
                        value: this.props.field.subfields[0],
                        operator: this.props.field.operators[0],
                        field: this.props.field,
                        term: ''
                    };
                default:
                    break;
            }
        },
        handleOperatorChange: function(e) {
            this.setState({operator: e.target.value});
        },
        handleValueChange: function(e) {
            this.setState({value: e.target.value});
        },
        handleTermChange: function(e) {
            this.setState({term: e.target.value});
        },
        addCriteria: function(e) {
            // do validation here
            if (this.validateSelection()) {
                this.props.clickHandler(this.state, this.props.field);
                this.setState({value: undefined});
            }
        },
        validateSelection: function() {
            switch(this.state.field.type) {
                case 'string':
                    if (! this.state.value.length > 0) {
                        return false;
                    }
                    break;
                case 'string+select':
                    if (! this.state.value.length > 0 || ! this.state.term.length > 0) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
            return true;
        },
        componentDidMount: function() {
            var addCriteria = this.addCriteria.bind(this);
            $(document).on('keydown', function(e) { if (e.keyCode === 13) addCriteria(); });
        },
        componentWillUpdate: function(props, state) {
            // if we just added a criteria or changed field type
            if (state.value === undefined || this.props.field !== props.field) {
                console.log('new state undefined');
                switch (props.field.type) {
                    case 'string':
                        console.log('setting string state');
                        this.setState({
                            value: '',
                            operator: props.field.operators[0],
                            field: props.field,
                            term: ''
                        });
                        break;
                    case 'select':
                        console.log('setting select state');
                        this.setState({
                            value: props.field.subfields.length > 0 ? props.field.subfields[0] : '',
                            operator: props.field.operators[0],
                            field: props.field,
                            term: ''
                        });
                        break;
                    case 'string+select':
                        console.log('setting string+select state');
                        this.setState({
                            value: props.field.subfields.length > 0 ? props.field.subfields[0] : '',
                            operator: props.field.operators[0],
                            field: props.field,
                            term: ''
                        });
                        break;
                    default:
                        break;
                }
            }

            // if a criteria prop is passed down to us different from the previous
            if (props.criteria !== this.props.criteria && props.criteria) {
                console.log('criteria not equal');
                this.setState({operator: props.criteria.operator, value: props.criteria.value, term: props.criteria.term});
            }
        },
        render: function() {
            switch (this.props.field.type) {
                case 'string':
                    return (
                        <span>
                            <select value={this.state.operator} onChange={this.handleOperatorChange}>
    {this.props.field.operators.map(function(operator) {
        return <option value={operator}>{operator}</option>
    })}
                            </select>
                            <input ref="value" type="text" value={this.state.value} onChange={this.handleValueChange} />
                            <button style={ this.state.value ? {} : {display: 'none'}} onClick={this.addCriteria}>+</button>
                        </span>
                    );
                case 'select':
                    return (
                        <span>
                            <select value={this.state.operator} onChange={this.handleOperatorChange}>
{this.props.field.operators.map(function(operator) {
    return <option value={operator}>{operator}</option>
})}
                            </select>
                            <select ref="value" value={this.state.value} onChange={this.handleValueChange}>
{this.props.field.subfields.map(function(subfield) {
    return <option value={subfield}>{subfield}</option>
})}
                            </select>
                            <button onClick={this.addCriteria} style={ this.state.value ? {} : {display: 'none'}}>+</button>
                        </span>
                    );
                    break;
                case 'string+select':
                    return (
                        <span>
                            <select ref="value" value={this.state.operator} onChange={this.handleOperatorChange}>
{this.props.field.operators.map(function(operator) {
    return <option value={operator}>{operator}</option>
})}
                            </select>
                            <select value={this.state.value} onChange={this.handleValueChange}>
{this.props.field.subfields.map(function(subfield) {
    return <option value={subfield}>{subfield}</option>
})}
                            </select>
                            <input ref="value" type="text" value={this.state.term} onChange={this.handleTermChange} />
                            <button style={(this.state.value && this.state.term) ? {} : {display: 'none'}} onClick={this.addCriteria}>+</button>
                        </span>
                    );
                    break;
                default:
                    break;
            }

        }
    }

);

var SearchCriteria = React.createClass({
    getInitialState: function () {
        return {
            value: undefined,
            fields: [
                {
                    field: 'code',
                    operators: ['must', 'must_not', 'should'],
                    type: 'string',
                    subfields: undefined

                },
                {
                    field: 'title',
                    operators: ['must', 'must_not', 'should'],
                    type: 'string',
                    subfields: undefined

                },
                {
                    field: 'groups',
                    operators: ['must', 'must_not', 'should'],
                    type: 'select',
                    subfields: [1, 2, 3]
                },
                {
                    field: 'metadata',
                    operators: ['must', 'must_not', 'should'],
                    type: 'string+select',
                    subfields: ['revision', 'facility', 'filename']
                },
                {
                    field: 'discipline',
                    operators: ['must', 'must_not', 'should'],
                    type: 'select',
                    subfields: ['electrical', 'mechanical', 'process']
                },
                {
                    field: 'components',
                    operators: ['has_more_than', 'has_less_than'],
                    subfields: ['pickle', 'cherry', 'weiner'],
                    type: 'string+select'
                }
            ],
            criteria: [],
            currentField: undefined,
            editMode: false,
            editCriteria: undefined,
            currentCriteria: undefined
        }
    },
    handleChange: function(e) {
        var foundField = undefined;
        for (var i = 0; i < this.state.fields.length; i++) {
            if (e.target.value === this.state.fields[i].field) {
                foundField = this.state.fields[i];
            }
        }

        this.setState({value: e.target.value, currentField: foundField});
    },
    addCriteria: function(newCriteria, field) {
        var criteria = this.state.criteria.slice();

        var fields = this.state.fields.slice();

        if (field.type === 'select') {
            for (var i = 0; i < this.state.fields.length; i++) {
                if (field.field === this.state.fields[i].field) {
                    for (var j = 0; j < this.state.fields[i].subfields.length; j++) {
                        if (this.state.fields[i].subfields[j] == newCriteria.value) {
                            fields[i].subfields.splice(j, 1);
                        }
                    }
                }
            }
        }
        criteria.push({value: newCriteria.value, operator: newCriteria.operator, subfield: newCriteria.subfield, field: field.field, type: field.type, term: newCriteria.term});

        this.setState({criteria: criteria, currentCriteria: undefined, fields: fields});
        this.refs.fieldSelect.getDOMNode().focus();
    },
    editCriteria: function(index) {
        var criteria = this.state.criteria[index];

        var foundField;

        var newCriteria = this.state.criteria.slice();
        newCriteria.splice(index, 1);

        var newFields = this.state.fields.slice();
        for (var i = 0; i < this.state.fields.length; i++) {
            if (criteria.field === this.state.fields[i].field) {
                if (criteria.type === 'select') {
                    newFields[i].subfields.push(criteria.value);
                }
                foundField = this.state.fields[i];
            }
        }

        this.setState({value: criteria.field, criteria: newCriteria, currentCriteria: criteria, currentField: foundField});
    },
    render: function() {
        var criteriaSelector;
        var editCriteria = this.editCriteria;

        if (this.state.currentField) {
            criteriaSelector = <CriteriaSelector field={this.state.currentField} criteria={this.state.currentCriteria} clickHandler={this.addCriteria.bind(this)} />;
        }

        return (
            <div>
                <h3>Criteria Selector</h3>
                <select ref="fieldSelect" value={this.state.value} onChange={this.handleChange}>
                    <option>Select a field</option>
{this.state.fields.map(function(field) {
    return <option value={field.field}>{field.field}</option>
})}
                </select>
{criteriaSelector}
                <h3>Current Criteria (click to edit)</h3>
                <ul className="criteria-list">
{this.state.criteria.map(function(criteria, i) {
    var boundClick = editCriteria.bind(null, i);
    return <li className="criteria-item" onClick={boundClick}>[{criteria.field} + {criteria.operator} + {criteria.value} + {criteria.term}]</li>
})}
                </ul>
            </div>


        );
    }
});

module.exports = {
    CriteriaSelector: CriteriaSelector,
    SearchCriteria: SearchCriteria
};