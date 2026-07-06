import React from 'react';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../../helpers/constants.js';

export const InputField = ({
    type,
    info,
    autoComplete = "on",
    size = "col-sm-3",
    req = false,
    placeholder = info,
    value = ""
}) => {

    return (
        <div className={`${size} mt-2 mb-2`}>
            <div className="form-group">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="form-control"
                    name={info.toLowerCase().replace(" ", "_")}
                    id={info.toLowerCase()}
                    autoComplete={autoComplete}
                    required={req}
                    defaultValue={value}
                />
            </div>
        </div>
    )
}


export const SelectField = ({
    path,
    name,
    size = "col-sm-3",
    defaultValue = ""
}) => {

    const [, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetchData = async () => {
        return await fetch(`${BASE_URL + path}`)
            .then(resp => resp.json());
    }

    return (
        <div className={`${size} mt-2 mb-2`}>
            <div className="select-container App">
                <AsyncSelect
                    // cacheOptions
                    id={name.toLowerCase()}
                    defaultOptions
                    name={name.toLowerCase().replace(" ", "_")}
                    value={selectedValue}
                    getOptionLabel={e => e[name.toLowerCase().replace(" ", "_")]}
                    getOptionValue={e => e[name.toLowerCase().replace(" ", "_")]}
                    loadOptions={fetchData}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    onSelect={handleChange}
                    placeholder={name}
                    isClearable={true}
                    defaultInputValue={defaultValue}
                    defaultValue={defaultValue}
                    menuPortalTarget={document.body}

                />
            </div>
        </div>
    )
}


export const MultiSelectField = ({
    path,
    name,
    size = "col-sm-3",
    defaultValue = ""

}) => {

    const [, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetchData = () => {
        return fetch(`${BASE_URL + path}`)
            .then(resp => resp.json());
    }

    return (
        <div className={`${size} mt-2 mb-2`}>
            <div className="select-container App">
                <AsyncSelect
                    // cacheOptions
                    id={name.toLowerCase()}
                    defaultOptions
                    name={name.toLowerCase().replace(" ", "_")}
                    value={selectedValue}
                    getOptionLabel={e => e[name.toLowerCase().replace(" ", "_")]}
                    getOptionValue={e => e[name.toLowerCase().replace(" ", "_")]}
                    loadOptions={fetchData}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    onSelect={handleChange}
                    placeholder={name}
                    isClearable={true}
                    isSearchable={true}
                    defaultInputValue={[defaultValue]}
                    defaultValue={[defaultValue]}
                    isMulti
                    menuPortalTarget={document.body}

                />
            </div>
        </div>
    )
}