import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthContext } from '@/context/authContext';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/utils/mutations/authMutations';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRoles } from '@/utils/queries';
import {
  consignorNavData,
  driverNavData,
  unregisteredNavData,
} from '@/utils/data';
import { getAvatarFallBack } from '@/utils/helpers';
import { useSocket } from '@/context/socketContext';

export function ProfileDropdown() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const { disconnectFromSocket } = useSocket();
  const isMobile = useIsMobile();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    onSuccess: () => {
      setCurrentUser(null);
      disconnectFromSocket();
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
      router.replace('/auth/login');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const navData = currentUser
    ? currentUser?.role === UserRoles.CONSIGNOR
      ? consignorNavData
      : driverNavData
    : unregisteredNavData;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser?.profile_picture} alt="@shadcn" />
            <AvatarFallback>
              {getAvatarFallBack(currentUser?.full_name || '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser?.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {isMobile &&
            navData.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.href}>
                  {item.title}
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => mutate()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
