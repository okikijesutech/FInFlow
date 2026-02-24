import { Save, User as UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input, Label, ErrorMessage } from '../../ui/FormPrimitives';
import { useUserStore } from '../../../store/useUserStore';
import { cn } from '../../../utils/cn';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileTab = () => {
  const { user, updateUser } = useUserStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    updateUser(data);
    reset(data); // Reset "dirty" state
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/10 p-2">
              <UserIcon className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>Manage your identity across the platform.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-6 pb-2">
              <div className="h-20 w-20 overflow-hidden rounded-2xl border border-indigo-500/50 bg-indigo-500/10">
                <img 
                  src={user.avatarUrl} 
                  alt="Avatar" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" size="sm">Change Avatar</Button>
                <Button type="button" variant="ghost" size="sm" className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-500">Remove</Button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  {...register('firstName')}
                  placeholder="e.g. Alex"
                />
                <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  {...register('lastName')}
                  placeholder="e.g. Rivers"
                />
                <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email"
                {...register('email')}
                placeholder="alex@example.com"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={!isDirty || isSubmitting}
                className="gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className={cn("h-4 w-4", isSubmitting && "animate-spin")} />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
