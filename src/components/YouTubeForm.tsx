import { useFieldArray, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useEffect } from 'react';

type FormValues = {
  username: string,
  email: string;
  channel: string;
  social: {
    twitter: string,
    facebook: string
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string,
  }[]

  age: number;
  dob: Date;

};
let renderCount = 0;
const YouTubeForm = () => {

  const form = useForm<FormValues>({
    defaultValues:
    {
      username: "Batman",
      email: '',
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },

      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),

    },
    mode: 'all'
  })
  const { register, control, handleSubmit, formState, watch, getValues, setValue,reset } = form
  // const { name, ref, onChange, onBlur } = register('username')
  const { errors, touchedFields, dirtyFields, isDirty,isSubmitSuccessful, } = formState;
  console.log('touch ', touchedFields, dirtyFields, isDirty)

  const { fields, append, remove } = useFieldArray({

    name: 'phNumbers',
    control
  })

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  //for get spacial value
  const handleGetValues = () => {
    console.log("Get values", getValues("social.facebook"));
    console.log("Get values", getValues(["social.facebook", 'username']));
  };
  //for set spacial value register field
  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  // const onReset = () => {
  //   reset();
  // };


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  renderCount++;
  const watchusername = watch(["username", 'email'])
  // const watchusername=watch()
  return (
    <div>
      <h1>YouTube Form({renderCount / 2})</h1>
      {/* <h2>Watch value:{JSON.stringify(watchusername)}</h2>  */}
      <h2>Watch value:{watchusername}</h2>
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

        <div className='form-control'>
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="channel" {...register('social.twitter', {

            disabled: watch('channel') === '',
            required: "Enter Twitter",

          })} />

        </div>

        <div className='form-control'>
          <label htmlFor="facebook">FACEBOOK</label>
          <input type="text" id="channel" {...register('social.facebook', {

          })} />

        </div>

        <div className='form-control'>
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input type="text" id="channel" {...register('phoneNumbers.0', {

          })} />

        </div>

        <div className='form-control'>
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input type="text" id="channel" {...register('phoneNumbers.1', {

          })} />

        </div>

        <div>
          <label>List of Phone numbers</label>
          <div>
            {
              fields.map((field, index) => {
                return (
                  <div className='form-control' key={field.id}>
                    <input type='text' {...register(`phNumbers.${index}.number` as const)} />

                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                );
              })
            }
            <button
              type="button"
              onClick={() =>
                append({
                  number: "",
                })
              }
            >
              Add phone number
            </button>


          </div>
        </div>

        <div className='form-control'>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age', {
            valueAsNumber: true,
            required: "channel is required"
          })} />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor="dob">Date of birth</label>
          <input type="date" id="dob" {...register('dob', {
            valueAsDate: true,
            required: "date is required"
          })} />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        <button type="button" onClick={()=> reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
