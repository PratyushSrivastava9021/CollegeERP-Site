import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes with proper conflict resolution
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(date) {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format date and time
export function formatDateTime(date) {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Capitalize first letter
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Format role for display
export function formatRole(role) {
  const roleMap = {
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
  }
  return roleMap[role] || capitalize(role)
}

// Format department for display
export function formatDepartment(department) {
  if (!department) return 'N/A'
  return department
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

// Get initials from name
export function getInitials(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce function
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Truncate text
export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Check if user has permission
export function hasPermission(user, requiredRole) {
  if (!user) return false
  
  const roleHierarchy = {
    student: 1,
    teacher: 2,
    admin: 3,
  }
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}
