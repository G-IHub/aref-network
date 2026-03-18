import { useAREF } from '../context/AREFContext.jsx';
export function useSubmissions() {
  const { submissions, addSubmission, setSubmissionStatus, removeSubmission } = useAREF();
  return { submissions, addSubmission, setSubmissionStatus, removeSubmission };
}
