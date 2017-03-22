namespace GroupProject.Interfaces
{
    public interface IStatusService
    {
        void SaveStatus(string userId, string lookingFor, string statusMessage);
    }
}