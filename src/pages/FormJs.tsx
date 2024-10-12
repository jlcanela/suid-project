import BpmnForm from "../components/Form";

import formSchema from './FormJs.json';

function FormJs() {
const onSubmit =  (data, errors) => {
  console.log(data, errors);
};
  return (
   <BpmnForm schema={formSchema} onSubmit={onSubmit}/>
  );
}

export default FormJs;
