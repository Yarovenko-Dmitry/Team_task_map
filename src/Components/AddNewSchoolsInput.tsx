import React, {ChangeEvent, useState} from "react";


const AddNewSchoolsInput =(props: any) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    return (
      <div>
          <input type='text' value={props.value} onChange={onChangeHandler}/>
      </div>
    );
}


export default AddNewSchoolsInput;