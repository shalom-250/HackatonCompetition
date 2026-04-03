import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const pathname = req.nextUrl.pathname;

        // Never intercept API auth routes
        if (pathname.startsWith('/api/auth')) {
            return NextResponse.next();
        }

        const isAuthPage = pathname.startsWith('/login') ||
            pathname.startsWith('/register');

        if (isAuthPage) {
            if (isAuth) {
                if (token.role === 'admin' || token.role === 'recruiter') {
                    return NextResponse.redirect(new URL('/dashboard', req.url));
                }
                if (token.role === 'jobseeker') {
                    return NextResponse.redirect(new URL('/jobseeker/dashboard', req.url));
                }
                return NextResponse.next();
            }
            return NextResponse.next();
        }

        // Protect Dashboard and Internal APIs
        const isDashboardPath = pathname.startsWith('/dashboard') ||
            pathname.startsWith('/jobs') ||
            pathname.startsWith('/candidates') ||
            pathname.startsWith('/analytics') ||
            pathname.startsWith('/settings') ||
            pathname.startsWith('/api/jobs') ||
            pathname.startsWith('/api/candidates') ||
            pathname.startsWith('/api/stats');

        const isSeekerPath = pathname.startsWith('/jobseeker') ||
            pathname.startsWith('/apply');

        if ((isDashboardPath || isSeekerPath) && !isAuth) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Recruiter access
        if (isDashboardPath && token?.role !== 'admin' && token?.role !== 'recruiter') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Seeker access
        if (isSeekerPath && token?.role !== 'jobseeker') {
            // If a recruiter tries to 'apply', we might allow it or redirect to dashboard
            if (token?.role === 'recruiter' || token?.role === 'admin') {
                return NextResponse.next(); // Recruiters can see seeker pages for testing
            }
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/jobseeker/:path*",
        "/apply/:path*",
        "/jobs/:path*",
        "/candidates/:path*",
        "/analytics/:path*",
        "/settings/:path*",
        "/api/jobs/:path*",
        "/api/candidates/:path*",
        "/api/stats/:path*",
        "/login",
        "/register"
    ],
};
