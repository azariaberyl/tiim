import { InputHTMLAttributes, forwardRef } from 'react';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Input = forwardRef<HTMLInputElement, Input>((props, ref) => {
  if (props.title) {
    return (
      // <div className='flex items-center justify-between py-5'>
      <>
        <label className='w-1/3 tracking-wide font-semibold text-gray-800' htmlFor={props.title}>
          {props.title}
        </label>
        <input
          id={props.title}
          className='text-base outline-none p-1 border border-gray-200 rounded ml-auto'
          ref={ref}
          {...props}
        />
      </>
      // </div>
    );
  }
  return <input className='text-base outline-none ml-1 p-1 border border-gray-200 rounded ' ref={ref} {...props} />;
});

export default Input;
