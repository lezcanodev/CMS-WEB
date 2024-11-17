
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5,6, false] }],
      [{ 'size': ['small', 'medium', 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }], // Opción para cambiar el color del texto
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
      [{ 'align': [] }],
      [{ 'background': [] }],
      ['blockquote', 'code-block'],
      [{ 'font': [] }],
    ]
  };
  
const formats = [
  'font',
  'blockquote',
  'code-block',
  'size',
  'background',
  'align',
  'header', 
  'bold', 
  'italic', 
  'underline', 
  'color', // Asegúrate de incluir 'color' en los formatos
  'list', 
  'bullet', 
  'link', 
  'image'
];

interface ContentEditorProps{
    value: string,
    onChange: (newValue: string) => void,
    defaultValue?: string
}
export default function ContentEditor({
    value, onChange, defaultValue
}: ContentEditorProps){
    return <>
         <div className="quill-container">
            <ReactQuill theme="snow" defaultValue={defaultValue || ''} modules={modules} formats={formats} value={value} onChange={onChange} />
        </div>
    </>
}