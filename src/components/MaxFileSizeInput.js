import React, {useState} from "react";
import {Form} from "react-bootstrap";

const MaxFileSizeInput = ({accept, label, text, maxFileSizeInBytes, maxFileSizeInKB, maxFileSizeInMB, onFileSelected, className}) => {
    const [error, setError] = useState('');

    if(!maxFileSizeInBytes && !maxFileSizeInKB && !maxFileSizeInMB) {
        throw new Error('You must provide a value for maxFileSizeInBytes, maxFileSizeInKB, or maxFileSizeInMB.');
    }
    if(!maxFileSizeInBytes)
    {
        if(maxFileSizeInKB)
            maxFileSizeInBytes = maxFileSizeInKB * 1024;
        else if(maxFileSizeInMB)
            maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
    }
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile && selectedFile.size > maxFileSizeInBytes) {
            setError(`File size exceeds the maximum limit (${maxFileSizeInBytes / 1024 / 1024} MB)`);
            event.target.value = null; // Clear the file input
            return;
        }

        onFileSelected(selectedFile);
        setError('');
    };

    return (
        <div className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="file" onChange={handleChange} accept={accept} required/>
            <div>{text && <Form.Text muted className='ms-1'>{text}</Form.Text>}</div>
            {error.length > 0 && <Form.Text className="text-danger ms-1">{error}</Form.Text>}
        </div>
    );
};

MaxFileSizeInput.defaultProps = {
    text: '',
    label: 'Upload File',
    maxFileSizeInMB: 5,
    onFileSelected: () => {}
};

export default MaxFileSizeInput;