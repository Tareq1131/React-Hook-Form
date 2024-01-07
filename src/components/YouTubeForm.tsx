import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FormValues = {
  username: string,
  email: string;
  channel: string;
};
let renderCount = 0;
const YouTubeForm = () => {

  const form = useForm<FormValues>()
  const { register, control, handleSubmit } = form
  // const { name, ref, onChange, onBlur } = register('username')

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  renderCount++;
  return (
    <div>
      <h1>YouTube Form({renderCount / 2})</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text"
          id="username"
          // name={name}
          // ref={ref}
          // onChange={onChange}
          // onBlur={onBlur}
          {...register('username', {
            required: {
              value: true,
              message:"Username is required"
            }
          })}
        />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register('email',{
          pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
          }
        })} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register('channel', {
            required: "channel is required"
          })} />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
