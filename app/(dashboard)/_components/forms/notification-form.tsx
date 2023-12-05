"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/components/providers/UserProvider";

import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UserProfile } from "@/types/UserProfile";

// 👇 FORM SCHEMA : Account Form
const notificationsFormSchema = z.object({
  notif_level: z.enum(["all", "profile", "none"], {
    required_error: "⚠ You need to select a notification type.",
  }),

  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  newsletter_emails: z.boolean().default(false).optional(),

  push_notifs: z.boolean().default(false).optional(),
  mobile_notifs: z.boolean().default(false).optional(),
});
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
// ⌛ PLACEHOLDER :  Default form values
const defaultValues: Partial<NotificationsFormValues> = {
  // 🎯 to-do-list : remove
};

export function NotificationsForm() {
  const { userProfile, updateUserDataProcess } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance,
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  //✅ SET FORM VALUES - fields with existing user profile data
  useEffect(() => {
    if (userProfile) {
      form.setValue("notif_level", userProfile.notifications.notif_level);
      form.setValue(
        "communication_emails",
        userProfile.notifications.communication_emails || false
      );
      form.setValue(
        "marketing_emails",
        userProfile.notifications.marketing_emails || false
      );
      form.setValue(
        "newsletter_emails",
        userProfile.notifications.newsletter_emails || false
      );
      form.setValue(
        "push_notifs",
        userProfile.notifications.push_notifs || false
      );
      form.setValue(
        "mobile_notifs",
        userProfile.notifications.mobile_notifs || false
      );

      // 🎯 to-do-list:  Set skills_list based on userProfile
    }
  }, [form, userProfile]);

  // ✅ SUBMIT FORM - submit notifications form
  function onSubmit(data: NotificationsFormValues) {
    console.log("🎯event-log:  📝UserForm/notifs-form/onSubmit:  💢 Triggered");
    if (userProfile) {
      setIsLoading(true); //- Set loading spinner
      const updatedUserData: UserProfile = {
        ...userProfile,
        notifications: {
          ...userProfile?.notifications,
          notif_level: data.notif_level,
          communication_emails: data.communication_emails!,
          marketing_emails: data.marketing_emails!,
          newsletter_emails: data.newsletter_emails!,
          push_notifs: data.push_notifs!,
          mobile_notifs: data.mobile_notifs!,
        },
      };

      updateUserDataProcess(userProfile.uuid, updatedUserData)
        .then(() => {
          // - on success
          console.log(
            "🎯event-log:  📝UserForm/notifs-form/onSubmit:  ✔ Success"
          );
          setIsLoading(false); //- Reset loading state
          setSubmitted(true);  //- Set achieved state

          setTimeout(() => {
            setSubmitted(false); //- Reset achieved state after a while
          }, 2000);
        })
        .catch((error) => {
          console.log(
            "🎯event-log:  📝UserForm/notifs-form/onSubmit:  ❌ Something went wrong, error: ",
            error
          );
          setIsLoading(false); //- Reset loading state
        });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(
            "🎯event_log:  📝-form submitted with following form-data : ",
            data
          );
          onSubmit(data);
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="notif_level"
          render={({ field }) => (
            <FormItem className="space-y-3 py-3">
              <FormLabel className="text-xl translate-y-2 font-semibold text-devready-green">
                Live notifications
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={userProfile?.notifications.notif_level!}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">All updates</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="profile" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Profile updates
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">No updates</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="text-xl translate-y-2 font-semibold text-devready-green">
          Email Notifications
        </h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="communication_emails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Communication emails
                  </FormLabel>
                  <FormDescription>
                    Receive emails about your account activity.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketing_emails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Marketing emails</FormLabel>
                  <FormDescription>
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newsletter_emails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Newsletter emails</FormLabel>
                  <FormDescription>
                    Subscirbe to our quarterly open source community letter.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-xl translate-y-2 font-semibold text-devready-green">
          Mobile Notifications
        </h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="push_notifs"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Push notifications
                  </FormLabel>
                  <FormDescription>
                    Receive push notifications on your device.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile_notifs"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Different settings for mobile
                  </FormLabel>
                  <FormDescription>
                    Manage how you receive notifications on your mobile devices.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant={"devfill"}
          disabled={isLoading}
          className="rounded-lg text-sm md:text-sm p-2"
        >
          {isLoading ? (
            <Spinner />
          ) : submitted ? (
            <Check />
          ) : (
            "Update preferences"
          )}
        </Button>
      </form>
    </Form>
  );
}
