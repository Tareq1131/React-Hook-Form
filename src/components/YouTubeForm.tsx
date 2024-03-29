import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

type FormValues = {
  username: string,
  email: string;
  channel: string;
};
let renderCount = 0;
const YouTubeForm = () => {

  const form = useForm<FormValues>({
    defaultValues:{
      username: 'Batman',
      email: '',
      channel: ''
    }
  })
  const { register, control, handleSubmit, formState } = form
  // const { name, ref, onChange, onBlur } = register('username')
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  renderCount++;
  return (
    <div>
      <h1>YouTube Form({renderCount / 2})</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
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
                message: "Username is required"
              }
            })}
          />
          <p className="error">{errors.username?.message}</p>

        </div>

        <div className='form-control'>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            
            },
          })} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel', {
            required: "channel is required"
          })} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
