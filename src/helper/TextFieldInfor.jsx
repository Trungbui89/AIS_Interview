import * as React from 'react'


export default function TextFieldInfor(props) {
    const {title, value} = props;
  return (
    <div className='text-field-infor'>
        <div className='text-field-title'>
            {title ? title : ''}
        </div>
        <div className='text-field-value'>
            <div>
                {value? value : ''}
            </div>
        </div>
    </div>
  )
}
