import * as React from 'react';
import classNames from 'classnames';

import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import SubmitButtonFormControl from './SubmitButtonFormControl';

// Global Netlify form shim (for build-time detection)
function NetlifyFormShim() {
    return (
        <form name="demo-call" data-netlify="true" hidden>
            <input type="text" name="name" />
            <input type="text" name="company-name" />
            <input type="email" name="email" />
            <input type="text" name="phone" />
            <select name="company-size">
                <option>Just me (solo operator / freelancer)</option>
                <option>2–5 people</option>
                <option>16–50 people</option>
                <option>51-100 people</option>
                <option>101+ people</option>
            </select>
        </form>
        )}
        
export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();
    const { fields = [], elementId, submitButton, className, styles = {}, 'data-sb-field-path': fieldPath } = props;

    if (fields.length === 0) {
        return null;
    }


    return (
       <NetlifyFormShim />
    
        <form
    className={classNames(
        'sb-component',
        'sb-component-block',
        'sb-component-form-block',
        className,
        styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
        styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
        styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
            ? mapStyles({
                  borderWidth: styles?.self?.borderWidth,
                  borderStyle: styles?.self?.borderStyle,
                  borderColor: styles?.self?.borderColor ?? 'border-primary'
              })
            : undefined,
        styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
    )}
    name="demo-call"
    id={elementId}
    ref={formRef}
    method="POST"
    data-netlify="true"
    action="/thank-you"
    data-sb-field-path={fieldPath}
>
            <div
                className={classNames('w-full', 'flex', 'flex-wrap', 'gap-8', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}
                {...(fieldPath && { 'data-sb-field-path': '.fields' })}
            >
                <input type="hidden" name="form-name" value="demo-call" />
                {fields.map((field, index) => {
                    const modelName = field.__metadata.modelName;
                    if (!modelName) {
                        throw new Error(`form field does not have the 'modelName' property`);
                    }
                    const FormControl = getComponent(modelName);
                    if (!FormControl) {
                        throw new Error(`no component matching the form field model name: ${modelName}`);
                    }
                    return <FormControl key={index} {...field} {...(fieldPath && { 'data-sb-field-path': `.${index}` })} />;
                })}
            </div>
            {submitButton && (
                <div className={classNames('mt-8', 'flex', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}>
                    <SubmitButtonFormControl {...submitButton} {...(fieldPath && { 'data-sb-field-path': '.submitButton' })} />
                </div>
            )}
        </form>
        </>
    );
}
