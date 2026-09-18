'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Pencil } from 'lucide-react';

interface EditPostLinkProps {
  postId: number;
}

const WP_ADMIN_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://backend-ilalalodge.focusonlinetravel.co.za';

function EditPostLinkInner({ postId }: EditPostLinkProps) {
  const [editMode, setEditMode] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL parameter to toggle edit mode
    const editParam = searchParams.get('edit');

    if (editParam === '1' || editParam === 'true') {
      localStorage.setItem('wp_edit_mode', '1');
      setEditMode(true);
    } else if (editParam === '0' || editParam === 'false') {
      localStorage.removeItem('wp_edit_mode');
      setEditMode(false);
    } else {
      // Check localStorage for existing edit mode
      const stored = localStorage.getItem('wp_edit_mode');
      setEditMode(stored === '1');
    }
  }, [searchParams]);

  if (!editMode) {
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

export default function EditPostLink({ postId }: EditPostLinkProps) {
  return (
    <Suspense fallback={null}>
      <EditPostLinkInner postId={postId} />
    </Suspense>
  );
}
