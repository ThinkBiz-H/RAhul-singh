import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { useData } from "../context/DataContext";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { data, addMessage } = useData();
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    addMessage(values);
    reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div>
      <section className="relative h-52 md:h-64 overflow-hidden bg-navy flex items-center justify-center text-center">
        {data.contact.contactBanner && (
          <img
            src={data.contact.contactBanner}
            alt="Contact banner"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        <div className="relative z-10">
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl">
            Contact Us
          </h1>
          <span className="block h-[3px] w-16 bg-primary rounded-full mt-4 mx-auto" />
        </div>
      </section>

      <section className="max-w-content mx-auto px-4 md:px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12">
        <div>
          <h2 className="font-display font-bold text-2xl text-navy mb-6">
            Get in Touch
          </h2>
          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiMapPin size={18} />
              </span>
              <div>
                <p className="font-semibold text-navy text-sm">
                  Office Address
                </p>
                <p className="text-ink/60 text-sm mt-1">
                  {data.contact.officeAddress}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiMail size={18} />
              </span>
              <div>
                <p className="font-semibold text-navy text-sm">Email</p>
                <p className="text-ink/60 text-sm mt-1">{data.contact.email}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiPhone size={18} />
              </span>
              <div>
                <p className="font-semibold text-navy text-sm">Phone</p>
                <p className="text-ink/60 text-sm mt-1">{data.contact.phone}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiClock size={18} />
              </span>
              <div>
                <p className="font-semibold text-navy text-sm">Working Hours</p>
                <p className="text-ink/60 text-sm mt-1">
                  {data.contact.workingHours}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden shadow-card h-64">
            <iframe
              title="Office location map"
              src={data.contact.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-surface rounded-xl p-6 md:p-8 shadow-card"
        >
          <h2 className="font-display font-bold text-2xl text-navy mb-6">
            Send a Message
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                placeholder="+91 00000 00000"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-navy mb-1.5">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-navy mb-1.5">
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Please write at least 10 characters",
                },
              })}
              rows={5}
              className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none"
              placeholder="How can we help?"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-[200] bg-navy text-white px-5 py-3.5 rounded-lg shadow-cardHover flex items-center gap-3"
          >
            <FiCheckCircle className="text-primary" size={20} />
            <span className="text-sm font-medium">
              Message sent successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
