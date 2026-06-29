import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyPassword, signToken, SESSION_COOKIE, cookieOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // password has select:false, so request it explicitly.
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await signToken({
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    });

    const res = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return res;
  } catch (err) {
    console.error("login error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
