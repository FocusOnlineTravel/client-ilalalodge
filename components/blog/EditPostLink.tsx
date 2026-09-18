'use client';

import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditPostLinkProps {
  postId: number;
}

const WP_ADMIN_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://backend-ilalalodge.focusonlinetravel.co.za';

export default function EditPostLink({ postId }: EditPostLinkProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for WordPress login cookie
    const cookies = document.cookie;
    const hasWordPressLogin = cookies.split(';').some(cookie =>
      cookie.trim().startsWith('wordpress_logged_in_')
    );
    setIsLoggedIn(hasWordPressLogin);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const editUrl = `${WP_ADMIN_URL}/wp-admin/post.php?post=${postId}&action=edit`;

  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-brand-forest hover:bg-brand-gold text-white p-3 rounded-full shadow-lg transition-colors group"
      title="Edit Post"
    >
      <Pencil className="w-5 h-5" />
      <span className="absolute left-full ml-2 px-2 py-1 bg-brand-forest text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Edit Post
      </span>
    </a>
  );
}
