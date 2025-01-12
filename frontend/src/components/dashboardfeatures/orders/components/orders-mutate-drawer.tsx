// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from '@/hooks/use-toast';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  // SheetClose,
  // SheetDescription,
  // SheetFooter,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
// import { SelectDropdown } from '@/components/select-dropdown';
// import { Task } from '../data/schema';
import { IOrderRes } from '@/utils/queries';
import { formatToTimeAndDate } from '@/utils/helpers';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: IOrderRes['data'][number];
}

// const formSchema = z.object({
//   title: z.string().min(1, 'Title is required.'),
//   status: z.string().min(1, 'Please select a status.'),
//   label: z.string().min(1, 'Please select a label.'),
//   priority: z.string().min(1, 'Please choose a priority.'),
// });
// type TasksForm = z.infer<typeof formSchema>;

export function OrdersMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  // const isUpdate = !!currentRow;

  const orderDetails = [
    {
      title: 'Weight in kg',
      value: currentRow?.weight,
    },
    {
      title: 'Pickup Time',
      value: formatToTimeAndDate(currentRow?.pickup_time) || 'Not set',
    },
    {
      title: 'Dropoff Time',
      value: formatToTimeAndDate(currentRow?.dropoff_time) || 'Not set',
    },
    {
      title: "Consignor's Attachments",
      value: currentRow?.consignor_attachments,
    },
    {
      title: "Driver's Attachments",
      value: currentRow?.driver_attachments,
    },
  ];

  // const form = useForm<TasksForm>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: currentRow ?? {
  //     title: '',
  //     status: '',
  //     label: '',
  //     priority: '',
  //   },
  // })

  // const onSubmit = (data: TasksForm) => {
  //   // do something with the form data
  //   onOpenChange(false);
  //   // form.reset();
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        // form.reset();
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>Order Details</SheetTitle>
          {/* <SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle> */}
          {/* <SheetDescription>
            {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>
        <div
          id="tasks-form"
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex-1"
        >
          <div className="flex gap-2 flex-col">
            {orderDetails.map((item) => (
              <p key={item.title}>
                <span className="font-geist-bold">{item.title}:</span>
                {` `} {item.value}
              </p>
            ))}
            {/* <span>it is not the case that i am going to discuss</span> */}
          </div>
        </div>
        {/* <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
