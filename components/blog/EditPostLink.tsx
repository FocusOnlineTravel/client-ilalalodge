'use client';

import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditPostLinkProps {
  postId: number;
}

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://backend-ilalalodge.focusonlinetravel.co.za';

export default function EditPostLink({ postId }: EditPostLinkProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged into WordPress as admin
    fetch(`${WP_URL}/wp-json/ilala/v1/is-admin`, {
      credentials: 'include', // Send WordPress cookies
    })
      .then(res => res.json())
      .then(data => {
        if (data.is_admin) {
          setIsAdmin(true);
        }
      })
      .catch(() => {
        // Silently fail - user not logged in
      });
  }, []);

  if (!isAdmin) {
    return null;
  }

  const editUrl = `${WP_URL}/wp-admin/post.php?post=${postId}&action=edit`;

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
