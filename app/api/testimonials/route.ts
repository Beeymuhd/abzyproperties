import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      rating,
      service_used,
      message,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .insert([
        {
          name,
          email,
          rating,
          service_used,
          message,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
const { data, error } = await supabaseAdmin
  .from("testimonials")
  .select("*")
  .eq("status", "approved")
  .order("created_at", {
    ascending: false,
  });

  if (error) {
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}