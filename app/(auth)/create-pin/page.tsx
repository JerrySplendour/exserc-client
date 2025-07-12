"use client";


import { useAuth } from "@/hooks/useAuth";
import { createPin } from "@/actions/auth";
import { Pin } from "@/lib/definitions";
import { useState } from "react";
import CreatePinForm from "@/components/CreatePinForm";
import ConfirmPinForm from "@/components/ConfirmPinForm";
import { Button } from "@/components/ui/button";

const CreatePin = () => {
  // switch state to form2
  const [form2, setForm2] = useState(false);

  // Custom hook to handle authentication logic
  // processes form submission, loading state, and validation
  const { form, loading, onSubmit } = useAuth({
    schema: Pin,
    action: createPin,
    checked: true,
    path: "/find-service-providers",
  });

  //handle save pin1
  const handleSavePin1 = (value: string) => {
    // Save the first pin value
    form.setValue("pin1", value);
  };



  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Button
              variant="default"
              className="absolute top-6 left-6"
              type="button"
              onClick={() => {
                if (form2) {
                  setForm2(false); // Switch to the second form if setForm2 is provided
                }
              }}
            >
                Back
            </Button>
      { !form2 ? 
      <CreatePinForm
        form={form}
        form2={form2}
        handleSavePin1={handleSavePin1}
        setForm2={setForm2}
      />
      :
      <ConfirmPinForm
      form={form}
      loading={loading}
      onSubmit={onSubmit}
      />
    }
    </div>
  );
};

export default CreatePin;
