import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Interview } from "../../domain/entities/interview";
import type {
  InterviewStatus,
  InterviewType,
  MessageSender,
  MessageType,
} from "../../domain/value-objects/enums";

export interface InterviewState {
  currentInterview: Interview | null;
  interviews: Interview[];
  loading: boolean;
  error: string | null;
}

export interface CreateInterviewPayload {
  characterId: string;
  companyId: string;
  type: InterviewType;
  title: string;
  description?: string;
}

export interface SendMessagePayload {
  content: string;
  type?: MessageType;
  metadata?: Record<string, any>;
}

export const useInterviewStore = defineStore("interview", () => {
  // State
  const currentInterview = ref<Interview | null>(null);
  const interviews = ref<Interview[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const activeInterviews = computed(() =>
    interviews.value.filter((interview) => interview.status === "in_progress")
  );

  const completedInterviews = computed(() =>
    interviews.value.filter((interview) => interview.status === "completed")
  );

  const pendingInterviews = computed(() =>
    interviews.value.filter((interview) => interview.status === "pending")
  );

  const isInterviewActive = computed(
    () => currentInterview.value?.status === "in_progress"
  );

  const currentMessages = computed(
    () => currentInterview.value?.messages || []
  );

  const lastMessage = computed(() => {
    const messages = currentMessages.value;
    return messages.length > 0 ? messages[messages.length - 1] : null;
  });

  // Actions
  const createInterview = async (payload: CreateInterviewPayload) => {
    loading.value = true;
    error.value = null;

    try {
      // This would call CreateInterviewUseCase
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Placeholder - in real implementation would create interview
      // const interview = await createInterviewUseCase.execute(payload)
      // currentInterview.value = interview
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to create interview";
    } finally {
      loading.value = false;
    }
  };

  const startInterview = async (interviewId: string) => {
    loading.value = true;
    error.value = null;

    try {
      // This would call StartInterviewUseCase
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Placeholder - in real implementation would start interview
      // const interview = await startInterviewUseCase.execute({ interview_id: interviewId })
      // currentInterview.value = interview
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to start interview";
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = async (payload: SendMessagePayload) => {
    if (!currentInterview.value || !isInterviewActive.value) {
      throw new Error("No active interview");
    }

    loading.value = true;
    error.value = null;

    try {
      // This would call SendMessageUseCase
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Placeholder - in real implementation would send message
      // const interview = await sendMessageUseCase.execute({
      //   interview_id: currentInterview.value.id.value,
      //   sender: MessageSender.USER,
      //   type: payload.type || MessageType.TEXT,
      //   content: payload.content,
      //   metadata: payload.metadata
      // })
      // currentInterview.value = interview
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to send message";
    } finally {
      loading.value = false;
    }
  };

  const completeInterview = async (score?: number, feedback?: string) => {
    if (!currentInterview.value) {
      throw new Error("No active interview");
    }

    loading.value = true;
    error.value = null;

    try {
      // This would call CompleteInterviewUseCase
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Placeholder - in real implementation would complete interview
      // const interview = await completeInterviewUseCase.execute({
      //   interview_id: currentInterview.value.id.value,
      //   score,
      //   feedback
      // })
      // currentInterview.value = interview
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to complete interview";
    } finally {
      loading.value = false;
    }
  };

  const loadInterview = async (interviewId: string) => {
    loading.value = true;
    error.value = null;

    try {
      // This would call GetInterviewUseCase
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Placeholder - in real implementation would load interview
      // const interview = await getInterviewUseCase.execute(interviewId)
      // currentInterview.value = interview
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to load interview";
    } finally {
      loading.value = false;
    }
  };

  const fetchInterviews = async () => {
    loading.value = true;
    error.value = null;

    try {
      // This would call appropriate use case to get all interviews
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Placeholder
      interviews.value = [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch interviews";
    } finally {
      loading.value = false;
    }
  };

  const clearCurrentInterview = () => {
    currentInterview.value = null;
  };

  const clearError = () => {
    error.value = null;
  };

  // Utility methods
  const getInterviewById = (id: string): Interview | undefined => {
    return interviews.value.find((interview) => interview.id.value === id) as
      | Interview
      | undefined;
  };

  const getMessagesByType = (type: MessageType) => {
    if (!currentInterview.value) return [];
    return currentInterview.value.messages.filter((msg) => msg.type === type);
  };

  const getMessagesBySender = (sender: MessageSender) => {
    if (!currentInterview.value) return [];
    return currentInterview.value.messages.filter(
      (msg) => msg.sender === sender
    );
  };

  return {
    // State
    currentInterview,
    interviews,
    loading,
    error,

    // Getters
    activeInterviews,
    completedInterviews,
    pendingInterviews,
    isInterviewActive,
    currentMessages,
    lastMessage,

    // Actions
    createInterview,
    startInterview,
    sendMessage,
    completeInterview,
    loadInterview,
    fetchInterviews,
    clearCurrentInterview,
    clearError,

    // Utilities
    getInterviewById,
    getMessagesByType,
    getMessagesBySender,
  };
});
