import { useState, useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@shopify/polaris';
import {
    XCircleIcon as CircleCancelMinor,
} from '@shopify/polaris-icons';
import {
    LegacyCard,
    LegacyStack,
    Button,
    Collapsible,
    TextContainer,
    Link,
    Select,
    Checkbox,
    TextField
} from '@shopify/polaris';
const inputFields = [
    {
        name: "text",
        type: "text"
    },
    {
        name: "textarea",
        type: "textarea"
    },
    {
        name: "email",
        type: "email"
    },
    {
        name: "password",
        type: "password"
    },
    {
        name: "number",
        type: "number"
    },
    {
        name: "date",
        type: "date"
    },
    {
        name: "datetime-local",
        type: "datetime-local"
    },
    {
        name: "time",
        type: "time"
    },
    {
        name: "checkbox",
        type: "checkbox"
    },
    {
        name: "radio",
        type: "radio"
    },
    {
        name: "file",
        type: "file"
    },
    {
        name: "url",
        type: "url"
    },
    {
        name: "tel",
        type: "tel"
    },
    {
        name: "range",
        type: "range"
    },
    {
        name: "color",
        type: "color"
    },
    {
        name: "select",
        type: "select"
    },
    {
        name: "hidden",
        type: "hidden"
    },
    {
        name: "search",
        type: "search"
    },
    {
        name: "month",
        type: "month"
    },
    {
        name: "week",
        type: "week"
    },
    {
        name: "submit",
        type: "submit"
    },
    {
        name: "reset",
        type: "reset"
    },
    {
        name: "button",
        type: "button"
    },
    {
        name: "rich text editor",
        type: "rich_text_editor"
    },
    {
        name: "date picker",
        type: "date_picker"
    },
    {
        name: "time picker",
        type: "time_picker"
    },
    {
        name: "color swatch",
        type: "color_swatch"
    },
    {
        name: "image swatch",
        type: "image_swatch"
    },              
    { name: "file upload",
        type: "file_upload"
    },
    {
        name: "dropdown with images",
        type: "dropdown_with_images"
    },
    {
        name: "swatch",
        type: "swatch"
    },



];


function Personlization() {
    const [openFields, setOpenFields] = useState({});
    const [fieldModal, SetFieldModal] = useState(false);

    const [generatedFields, setGeneratedFields] = useState([]);

    const handleFieldsModal = () => {
        console.log("field modal");
        SetFieldModal(!fieldModal);
    }

    const generateField = (fieldData) => {
        SetFieldModal(!fieldModal);
        const newField = {
            id: uuidv4(),
            type: fieldData.type,
            name: fieldData.name,
            fieldName: '',
            fieldWidth: 'full_width',
            fieldRequired: false,
            fieldHidden: false,
            hiddenFieldValue: '',

            uiOptions: {
                isSwatch: false,
                colorSwatch: false,
                imageSwatch: false,
                fileUpload: false,
                richTextEditor: false,
                datePicker: false,
                timePicker: false,
                dropdownWithImages: false,
            },

            logicOptions: {
                conditionalLogic: false,
            },

            variantOptions: {
                swatchOptions: [],
                variantMapping: {},
            },

            visibility: {
                showOnProductPage: true,
                showOnCartPage: false,
                showOnCheckoutPage: false,
                mandatory: false,
                optional: true,
            },

            applyTo: {
                applyToAllProducts: true,
                chooseProducts: [],
                applyToAllCollections: false,
                chooseCollections: [],
            },

            fieldHtmlString: generateFieldHtmlString(fieldData),
        };
        setGeneratedFields([...generatedFields, newField]);
    };

    // generating fields html

    const fieldHtml = (fieldData) => {

        // adding switch case for field type and returning corresponding field html
        switch (fieldData.type) {
            case "text":
                return <input type="text" onChange={(e) => createName()} />
            case "textarea":
            case "email":
            case "password":
            case "number":
            case "date":
            case "datetime-local":
            case "time":
            case "checkbox":
            case "radio":
            case "file":
            case "url":
            case "tel":
            case "range":
            case "color":
            case "select":
            case "hidden":
            case "search":
            case "month":
            case "week":
            case "submit":
            case "reset":
                return <input type={fieldData.type} name={fieldData.name} />
            case "rich_text_editor":
                return <textarea name={fieldData.name} />
            case "date_picker":
                return <input type="date" name={fieldData.name} />
            case "time_picker":
                return <input type="time" name={fieldData.name} />
            case "color_swatch":
                return <input type="color" name={fieldData.name} />
            case "image_swatch":
                return <input type="file" accept="image/*" name={fieldData.name} />
            case "file_upload":
                return <input type="file" name={fieldData.name} />
            case "dropdown_with_images":
                return (
                    <select name={fieldData.name}>
                        <option value="">-- Select an option --</option>
                        {/* Add options with images here */}
                    </select>
                );
            case "swatch":
                return <input type="radio" name={fieldData.name} />  
            case "button":
                return <input type={fieldData.type} name={fieldData.name} />
            default:
                return null;
        }

    }
    const createName = (value, id) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, fieldName: value } : field
            )
        );
    };

    const toggleField = useCallback((id) => {
        setOpenFields((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }, []);

    const createWidth = (value, id) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, fieldWidth: value } : field
            )
        );
    }
    const createRequired = (value, id) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id
                    ? { ...field, fieldRequired: value } // Keep this at top level if you want
                    : field
            )
        );
    };
    const createHidden = (value, id) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id
                    ? { ...field, fieldHidden: value }
                    : field
            )
        );
    };
    const addHiddenValue = (value, id) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id
                    ? { ...field, hiddenFieldValue: value }
                    : field
            )
        );
    };
    // Check for unsaved changes
    const hasUnsavedChanges = (() => {
        const savedFields = localStorage.getItem('customFormFields');
        if (!savedFields) {
            return generatedFields.length > 0; // If nothing is saved, any generated field is unsaved
        }
        const parsedSavedFields = JSON.parse(savedFields);
        return JSON.stringify(parsedSavedFields) !== JSON.stringify(generatedFields);
    })();

    const handleSaveForm = () => {

        // Save the generatedFields to localStorage
        localStorage.setItem('customFormFields', JSON.stringify(generatedFields));
        console.log("Form saved", generatedFields);
        alert('Form saved successfully!');
    }
    const handleDiscardChanges = () => {
        // Clear the generatedFields and remove from localStorage
        // only remove if there are unsaved changes
        //also dont remove from local storage if there are no unsaved changes
        const savedFields = localStorage.getItem('customFormFields');
        if (savedFields) {
            setGeneratedFields(JSON.parse(savedFields));
        } else {
            setGeneratedFields([]);
        }
        alert('Changes discarded!');

    }
    const deleteField = (id) => {
        setGeneratedFields((prevFields) =>
            prevFields.filter((field) => field.id !== id)
        );
    }

    const handlePreview = () => {
        const previewWindow = window.open('', '_blank', 'width=600,height=800');

        if (previewWindow) {
            const doc = previewWindow.document;

            doc.write('<!DOCTYPE html><html><head><title>Form Preview</title></head><body></body></html>');
            doc.close(); // Finish loading the document

            const style = doc.createElement('style');
            style.textContent = `
      body { font-family: Arial, sans-serif; padding: 20px; }
      .form-field { margin-bottom: 15px; }
      label { display: block; margin-bottom: 5px; }
      input, select, textarea { width: 100%; padding: 8px; box-sizing: border-box; }
    `;
            doc.head.appendChild(style);

            const heading = doc.createElement('h2');
            heading.textContent = 'Form Preview';
            doc.body.appendChild(heading);

            const form = doc.createElement('form');
            doc.body.appendChild(form);

            generatedFields.forEach((field) => {
                const fieldWrapper = doc.createElement('div');
                fieldWrapper.className = 'form-field';
                fieldWrapper.style.width =
                    field.fieldWidth === 'full_width'
                        ? '100%'
                        : field.fieldWidth === 'half_width'
                            ? '48%'
                            : '30%';
                fieldWrapper.style.display = 'inline-block';
                fieldWrapper.style.marginRight = '2%';

                const label = doc.createElement('label');
                label.textContent = `${field.fieldName || 'Untitled Field'}${field.fieldRequired ? ' *' : ''}`;
                fieldWrapper.appendChild(label);

                const input = generateInputElement(field, doc);
                fieldWrapper.appendChild(input);

                form.appendChild(fieldWrapper);
            });
        }
    };


    // actually this feld be added into product customization fields so also need to add stuff like swatches, color swatches, file upload, images,
    // date picker, time picker, rich text editor, dropdown with images etc.also connect the swatches with product variant so when user select a swatch it will select the corresponding variant
    // also conditional logic like if user select a specific option then show/hide other fields etc.
    // also need to add options to choose to apply these fields to specific products, collections or entire store
    // also need to add options to choose to show these fields on product page, cart page or checkout page
    // also need to add options to choose to make these fields mandatory or optional
    // this much options are enough for now will add more later if needed






    // Utility to generate input field element for preview
    const generateInputElement = (field, doc) => {
        const input = doc.createElement(field.type === 'textarea' ? 'textarea' : 'input');
        input.type = field.type;
        input.name = field.name;

        if (field.fieldRequired) {
            input.required = true;
        }

        if (field.fieldHidden) {
            input.type = 'hidden';
            input.value = field.hiddenFieldValue || '';
        }

        return input;
    };

    const generateFieldHtmlString = (field) => {
        const requiredAttr = field.fieldRequired ? 'required' : '';
        const hiddenStyle = field.fieldHidden ? 'display:none;' : '';

        switch (field.type) {
            case 'textarea':
                return `<textarea name="${field.fieldName}" ${requiredAttr} style="${hiddenStyle}"></textarea>`;
            case 'select':
                return `<select name="${field.fieldName}" ${requiredAttr} style="${hiddenStyle}">
                        <option value="">-- Select an option --</option>
                    </select>`;
            case 'checkbox':
            case 'radio':
                return `<input type="${field.type}" name="${field.fieldName}" ${requiredAttr} style="${hiddenStyle}" />`;
            case 'hidden':
                return `<input type="hidden" name="${field.fieldName}" value="${field.hiddenFieldValue || ''}" />`;
            default:
                return `<input type="${field.type}" name="${field.fieldName}" ${requiredAttr} style="${hiddenStyle}" />`;
        }
    };


    const generateSwatchesField = () => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) => {
                if (field.type === 'swatch') {
                    return {
                        ...field,
                        variantOptions: {
                            ...field.variantOptions,
                            swatchOptions: [
                                ...field.variantOptions.swatchOptions,
                                { label: '', value: '' },
                            ],
                        },
                    };
                }
                return field;
            })
        );
    };
    
const updateSwatchOption = (value, fieldId, optionIndex) => {
    setGeneratedFields((prevFields) =>
        prevFields.map((field) => {
            if (field.id === fieldId && field.type === 'swatch') {
                const updatedSwatchOptions = field.variantOptions.swatchOptions.map((option, index) =>
                    index === optionIndex ? { ...option, label: value } : option
                );
                return {
                    ...field,
                    variantOptions: {
                        ...field.variantOptions,
                        swatchOptions: updatedSwatchOptions,
                    },
                };
            }
            return field;
        }) // close map
    ); // close setGeneratedFields
};
    
    const removeSwatchOption = (fieldId, optionIndex) => {
        setGeneratedFields((prevFields) =>
            prevFields.map((field) => {
                if (field.id === fieldId && field.type === 'swatch') {
                    const updatedSwatchOptions = field.variantOptions.swatchOptions.filter(
                        (option, index) => index !== optionIndex
                    );
                    return {
                        ...field,
                        variantOptions: {
                            ...field.variantOptions,
                            swatchOptions: updatedSwatchOptions,
                        },
                    };
                }
                return field;
            })
        );
    };      

const generateSwatchOption = (fieldId) => {
    setGeneratedFields((prevFields) =>
        prevFields.map((field) => {
            if (field.id === fieldId && field.type === 'swatch') {
                return {
                    ...field,
                    variantOptions: {
                        ...field.variantOptions,
                        swatchOptions: [
                            ...field.variantOptions.swatchOptions,
                            { label: '', value: '' },
                        ],
                    },
                };
            }
            return field;
        }) // <-- close map
    ); // <-- close setGeneratedFields
};


// use graphql to fetch product variant options and map with swatches later
const fetchProductVariantOptions = async () => {
    // Placeholder for GraphQL query to fetch product variant options


    // Implement the actual GraphQL query using Shopify's API
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
            query: `
                query GetProducts {
                    products(first: 10) {
                        nodes {
                            id
                            title
                        }
                    }
                }
            `,
        }),
    });

    const data = await response.json();
    console.log('Fetched product variant options:', data);
    return data;
};




    return (
        <main className="main_app_page">
            <div>


                <button className="open_modal" onClick={handleFieldsModal}>Field Modal</button>
                <button className="open_modal" onClick={handleSaveForm}>Save Form</button>

                {/* only show the button if there are unsaved changes */}
                {hasUnsavedChanges && (
                    <button className="open_modal" onClick={handleDiscardChanges}>Discard Changes</button>
                )}

                <button className="open_modal" onClick={handlePreview}>Preview</button>



                {fieldModal &&
                    <div className="modal">
                        <div className="overlay">
                            <div className="main_block">
                                <div className="top-panel">  <button className="close_modal" onClick={handleFieldsModal}>
                                    <Icon
                                        source={CircleCancelMinor}
                                        tone="base"
                                    />
                                </button></div>
                                <div className="button_main_block">
                                    {
                                        inputFields.map((field, index) => (
                                            <div className="button_block" key={index}>
                                                <button className="create_button" onClick={() => generateField(field)}>{field.name}</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="generated_fields_block">
                    {generatedFields.map((field) => (
                        <LegacyCard sectioned key={field.id}>
                            <LegacyStack vertical>
                                <Button
                                    onClick={() => toggleField(field.id)}
                                    ariaExpanded={!!openFields[field.id]}
                                    ariaControls={`collapsible-${field.id}`}
                                >
                                    {field.fieldName || 'Untitled Field'}
                                </Button>

                                <Collapsible
                                    open={!!openFields[field.id]}
                                    id={`collapsible-${field.id}`}
                                    transition={{ duration: '300ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint
                                >
                                    <TextContainer>


                                            {/* add button to add multiple swatches options */}

                                            <div className="variant_options_block"> 
                                            {
                                                field.type === 'swatch' && (
                                                    <div className="swatch_options_block">

                                                        <button onClick={generateSwatchesField}>Add Swatches</button>

                                                        <div className="swatch_options_list">
                                                            {field.variantOptions.swatchOptions.map((swatch, index) => (
                                                                <div className="swatch_option_item" key={index}>
                                                                    <TextField
                                                                        label={`Swatch Option ${index + 1}`}
                                                                        value={swatch.label}
                                                                        onChange={(value) => updateSwatchOption(value, field.id, index)}
                                                                    />
                                                                    <button onClick={() => removeSwatchOption(field.id, index)}>Remove</button>
                                                                </div>
                                                            ))}
                                                        </div>

                                                 
                                                    </div>
                                                )}
                                                
                                                {/* also here i should able to map with the product variant options */}
                                                {/* also need to able choose the product variant */}
                                            </div>

                                        <div className="field_name_block">
                                            <TextField
                                                label="Field Name"
                                                name="heading"
                                                placeholder="Enter field value"
                                                value={field.fieldName}
                                                onChange={(value) => createName(value, field.id)} // ✅ just the value
                                                autoComplete="off"
                                            />

                                        </div>
                                        <div className="field_layout_settings">

                                            <div className="field_width">
                                                <Select
                                                    label="Field Width"
                                                    labelInline
                                                    options={[
                                                        { label: 'Full Width', value: 'full_width' },
                                                        { label: 'Half Width', value: 'half_width' },
                                                        { label: 'Third Width', value: 'third_width' },
                                                    ]}
                                                    onChange={(value) => createWidth(value, field.id)}
                                                    value={field.fieldWidth || 'full_width'} // default to full if not set
                                                />
                                            </div>

                                            <div className="field_required">
                                                <Checkbox
                                                    label="Required"
                                                    checked={!!field.fieldRequired} // fallback to false if undefined
                                                    onChange={(newChecked) => createRequired(newChecked, field.id)}
                                                />
                                            </div>
                                            <div className="field_hidden">
                                                <Checkbox
                                                    label="Hidden"
                                                    checked={!!field.fieldHidden} // fallback to false if undefined
                                                    onChange={(newChecked) => createHidden(newChecked, field.id)}
                                                />
                                            </div>

                                            {/* if field is hidden add some default value to that  */}
                                            {field.fieldHidden && (
                                                <div className="hidden_field_value">
                                                    <TextField
                                                        label="Hidden Field Value"
                                                        name="hidden_value"
                                                        placeholder="Enter hidden field value"
                                                        value={field.hiddenFieldValue}
                                                        onChange={(value) => addHiddenValue(value, field.id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <button className="delete_field open_modal" onClick={() => deleteField(field.id)}>Delete Field</button>

                                            <button onClick={fetchProductVariantOptions}>Fetch Product Variant Options</button>
                                    </TextContainer>
                                </Collapsible>
                            </LegacyStack>
                        </LegacyCard>
                    ))}
                    <button className="add_field open_modal" onClick={handleFieldsModal}>Add Field</button>

                </div>

            </div >
        </main>
    )
}

export default Personlization
